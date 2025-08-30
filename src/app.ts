import express from 'express';
import { ErrorHandler } from './middlewares/ErrorHandler.ts';
import IndexRoutes from './routes/IndexRoutes.ts'
import AdminRoutes from './routes/AdminRoutes.ts'
import AuthRoutes from './routes/AuthRoutes.ts'
import MovieRoutes from './routes/MovieRoutes.ts'
import BookingRoutes from './routes/BookingRoutes.ts'
import TemporaryRoutes from './routes/TemporaryRoutes.ts'

const app = express();

app.use(express.json());

// Routes
app.use("/", IndexRoutes);
app.use("/api/v1/admin", AdminRoutes);
app.use("/api/v1", AuthRoutes)
app.use("/api/v1/movie", MovieRoutes)
app.use("/api/v1/booking", BookingRoutes)
app.use("/temporary", TemporaryRoutes)

// Error Handler
app.use(ErrorHandler);

export default app;