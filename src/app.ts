import express from 'express';
import { ErrorHandler } from './middlewares/ErrorHandler.ts';
import IndexRoutes from './routes/IndexRoutes.ts'
import AuthRoutes from './routes/AuthRoutes.ts'

const app = express();

app.use(express.json());

// Routes
app.use("/", IndexRoutes);
app.use("/api/v1", AuthRoutes)

// Error Handler
app.use(ErrorHandler);

export default app;