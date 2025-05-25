import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { AppDataSource } from './config/database';
import taskRoutes from './routes/taskRoutes';
import { errorHandler } from './middleware/errorHandler';
import { setupApplicationInsights } from './config/monitoring';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Setup monitoring
if (process.env.APPLICATION_INSIGHTS_KEY) {
  setupApplicationInsights();
}

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/tasks', taskRoutes);

// Error handling
app.use(errorHandler);

// Initialize database and start server
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🤖 AI Service: ${process.env.AZURE_OPENAI_ENDPOINT ? 'Connected' : 'Not configured'}`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  });