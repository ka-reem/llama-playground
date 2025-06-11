# Llama TypeScript Frontend

A simple and beautiful TypeScript frontend application that uses the Llama API client to create a chat interface.

## Features

- 🦙 **Llama API Integration**: Direct integration with Llama API using the official TypeScript client
- 💬 **Real-time Chat**: Interactive chat interface with support for multiple models
- 🌊 **Streaming Support**: Real-time streaming responses for better user experience
- 🎨 **Modern UI**: Beautiful, responsive design with gradient backgrounds and smooth animations
- 🔧 **TypeScript**: Fully typed with TypeScript for better development experience
- 🚀 **Easy Setup**: Simple installation and configuration

## Quick Start

### 1. Installation

```bash
cd llama-ts-lib
npm install
```

### 2. Configuration

Copy the environment file and add your Llama API key:

```bash
cp .env.example .env
```

Edit `.env` and add your Llama API key:
```
LLAMA_API_KEY=your-actual-api-key-here
PORT=3000
```

### 3. Build and Run

```bash
# Build the TypeScript code
npm run build

# Start the server
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

### 4. Access the Application

Open your browser and navigate to: `http://localhost:3000`

## API Endpoints

The application provides the following REST API endpoints:

- `POST /api/chat/completions` - Send chat messages to Llama
- `GET /api/models` - Get available Llama models
- `GET /api/health` - Health check endpoint

### Chat API Example

```bash
curl -X POST http://localhost:3000/api/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Hello, how are you?"}
    ],
    "model": "llama3.1-8b-instruct",
    "stream": false
  }'
```

## Project Structure

```
llama-ts-lib/
├── src/
│   ├── index.ts          # Main server file
│   └── routes.ts         # API routes and Llama integration
├── public/
│   └── index.html        # Frontend chat interface
├── dist/                 # Compiled TypeScript output
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Available Models

The application supports the following Llama models:

- `llama3.1-8b-instruct`
- `llama3.1-70b-instruct`
- `llama3.1-405b-instruct`
- `llama3.2-1b-instruct`
- `llama3.2-3b-instruct`

## Features Overview

### Chat Interface
- Clean, modern chat UI with message bubbles
- User and assistant message differentiation
- Real-time message streaming
- Model selection dropdown
- Responsive design for mobile and desktop

### API Integration
- Full TypeScript integration with Llama API client
- Error handling and validation
- Support for both streaming and non-streaming responses
- CORS support for frontend communication

### Development Features
- TypeScript with strict type checking
- Hot reload during development
- Source maps for debugging
- Express.js server with REST API

## Development

### Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server
- `npm run serve` - Serve static files for testing

### Adding New Features

1. **Backend**: Add new routes in `src/routes.ts`
2. **Frontend**: Modify `public/index.html` for UI changes
3. **Types**: Update TypeScript interfaces as needed

## Troubleshooting

### Common Issues

1. **API Key Error**: Make sure your `LLAMA_API_KEY` is set correctly in the `.env` file
2. **Port in Use**: Change the `PORT` in `.env` if 3000 is already in use
3. **Build Errors**: Run `npm install` to ensure all dependencies are installed

### Getting Help

For issues related to the Llama API client, refer to:
https://github.com/meta-llama/llama-api-typescript

## License

This project is open source and available under the MIT License.
