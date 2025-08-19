import express from 'express';
import { ErrorHandler } from './middlewares/ErrorHandler.ts';
import IndexRoutes from './routes/IndexRoutes.ts'

const app = express();

app.use(express.json());

// Routes
app.use("/", IndexRoutes);

// Error Handler
// app.use(ErrorHandler);

export default app;