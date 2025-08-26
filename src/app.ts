import express from 'express';
import { ErrorHandler } from './middlewares/ErrorHandler.ts';
import IndexRoutes from './routes/IndexRoutes.ts'
import AuthRoutes from './routes/AuthRoutes.ts'
import MovieRoutes from './routes/MovieRoutes.ts'
import BookingRoutes from './routes/BookingRoutes.ts'

const app = express();

app.use(express.json());

// Routes
app.use("/", IndexRoutes);
app.use("/api/v1", AuthRoutes)
app.use("/api/v1/movie", MovieRoutes)
app.use("/api/v1/booking", BookingRoutes)

// Error Handler
app.use(ErrorHandler);

export default app;