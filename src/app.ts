import express from 'express';
import { ErrorHandler } from './middlewares/ErrorHandler.ts';
import IndexRoutes from './routes/IndexRoutes.ts'
import AdminRoutes from './routes/AdminRoutes.ts'
import AuthRoutes from './routes/AuthRoutes.ts'
import MovieRoutes from './routes/MovieRoutes.ts'
import BookingRoutes from './routes/BookingRoutes.ts'
import TemporaryRoutes from './routes/TemporaryRoutes.ts'
import { AuthMiddleware } from './middlewares/AuthMiddleware.ts';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename)
app.use('/public', express.static(path.join(__dirname, 'public')))

// Routes
app.use("/", IndexRoutes);
app.use("/api/v1/admin", AuthMiddleware.admin, AdminRoutes);
app.use("/api/v1/auth", AuthRoutes)
app.use("/api/v1/movie", MovieRoutes)
app.use("/api/v1/bookings", AuthMiddleware.user, BookingRoutes)
app.use("/temporary", TemporaryRoutes)

// Error Handler
app.use(ErrorHandler);

export default app;