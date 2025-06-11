import { Request, Response } from 'express';
import LlamaAPIClient from 'llama-api-client';

// Initialize the Llama API client
const client = new LlamaAPIClient({
  apiKey: process.env.LLAMA_API_KEY || 'your-api-key-here',
});

export interface ChatMessage {
  content: string;
  role: 'user' | 'assistant' | 'system';
}

export interface ChatRequest {
  messages: ChatMessage[];
  model?: string;
  stream?: boolean;
}

export interface ChatResponse {
  completion_message: {
    content?: string;
    role: 'assistant';
  };
  id?: string;
  metrics?: Array<{
    metric: string;
    value: number;
    unit?: string;
  }>;
}

/**
 * Handle chat completion requests
 */
export async function handleChatCompletion(req: Request, res: Response): Promise<void> {
  try {
    const { messages, model = 'Llama-4-Maverick-17B-128E-Instruct-FP8', stream = false }: ChatRequest = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ 
        error: 'Messages array is required and cannot be empty' 
      });
      return;
    }

    // Validate message format
    for (const message of messages) {
      if (!message.content || !message.role) {
        res.status(400).json({ 
          error: 'Each message must have content and role properties' 
        });
        return;
      }
    }

    if (stream) {
      // Handle streaming response
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      });

      const streamResponse = await client.chat.completions.create({
        messages,
        model,
        stream: true,
      });

      for await (const chunk of streamResponse) {
        res.write(`data: ${JSON.stringify(chunk)}\n\n`);
      }
      
      res.write('data: [DONE]\n\n');
      res.end();
    } else {
      // Handle regular response
      const response = await client.chat.completions.create({
        messages,
        model,
      });

      const chatResponse: ChatResponse = {
        completion_message: {
          content: typeof response.completion_message.content === 'string' 
            ? response.completion_message.content 
            : response.completion_message.content?.text || '',
          role: 'assistant'
        },
        id: response.id,
        metrics: response.metrics,
      };

      res.json(chatResponse);
    }
  } catch (error) {
    console.error('Chat completion error:', error);
    
    if (error instanceof LlamaAPIClient.APIError) {
      res.status(error.status || 500).json({
        error: error.message,
        type: error.name,
      });
    } else {
      res.status(500).json({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

/**
 * Get available models
 */
export async function handleGetModels(req: Request, res: Response): Promise<void> {
  try {
    // This is a mock response since the actual models endpoint might vary
    // You should replace this with the actual models API call when available
    const models = [
      'Llama-4-Maverick-17B-128E-Instruct-FP8',
      'llama3.1-70b-instruct',
      'llama3.1-405b-instruct',
      'llama3.2-1b-instruct',
      'llama3.2-3b-instruct',
    ];

    res.json({ models });
  } catch (error) {
    console.error('Get models error:', error);
    res.status(500).json({
      error: 'Failed to fetch models',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Health check endpoint
 */
export function handleHealthCheck(req: Request, res: Response): void {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'llama-api-frontend'
  });
}
