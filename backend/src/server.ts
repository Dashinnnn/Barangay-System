import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

dotenv.config();
const PORT = process.env.PORT || 5000;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
const app = express();
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter });


//Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'))
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(express.urlencoded({ extended:true }));

//Test Route
app.get('/', (req, res) => {
    res.json({
        message: 'Barangay System API is running!',
        status: 'OK'
    });
});

//Healt check route (with database test)
app.get('/health', async (req, res) => {
    try{
        await prisma.$queryRaw`SELECT 1`;
        res.json({
            status: 'Healthy',
            database: 'Connected',
            timeStamp: new Date().toISOString()
        })
    } catch(error) {
        res.status(500).json({
            status:'Unhealthy',
            database: 'Disconnected',
            error: error instanceof Error ? error.message : 'Unknown Error'
        });
    }
});

//TODO: Add routes here later 

//Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message: undefined
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Health check: http//localhost:${PORT}/health`)
})
