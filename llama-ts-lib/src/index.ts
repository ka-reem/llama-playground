import 'dotenv/config';
import express from 'express';
import path from 'path';
import { handleChatCompletion, handleGetModels, handleHealthCheck } from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// CORS middleware for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// API Routes
app.post('/api/chat/completions', handleChatCompletion);
app.get('/api/models', handleGetModels);
app.get('/api/health', handleHealthCheck);

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 API endpoints:`);
  console.log(`   POST /api/chat/completions - Chat with Llama`);
  console.log(`   GET  /api/models - Get available models`);
  console.log(`   GET  /api/health - Health check`);
});

export default app;
