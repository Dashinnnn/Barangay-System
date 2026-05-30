import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes';
import residentRoutes from './routes/residentRoutes';
import purokRoutes from './routes/residentRoutes';
import documentRequestRoutes from './routes/documentRequestRoutes'
import prisma from './config/database';   


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/residents', residentRoutes);
app.use('/api/puroks', purokRoutes);
app.use('/api/document-requests', documentRequestRoutes);

// Test Route
app.get('/', (req, res) => {
    res.json({
        message: 'Barangay System API is running!',
        status: 'OK'
    });
});

// Health Check
app.get('/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({
            status: 'Healthy',
            database: 'Connected',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'Unhealthy',
            database: 'Disconnected',
            error: error instanceof Error ? error.message : 'Unknown Error'
        });
    }
});

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
});