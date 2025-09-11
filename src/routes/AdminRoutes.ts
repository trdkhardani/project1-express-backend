import { Router } from "express";
import { StripeAccountController } from "../controllers/Admin/Stripe/AccountController.ts";
import { MovieController } from "../controllers/Admin/Movie/MovieController.ts";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.ts";
import { upload } from "../utils/multer.utils.ts";
const router = Router();

// Stripe
router.patch("/stripe/account", StripeAccountController.createAccount)
router.patch("/stripe/account-link", StripeAccountController.createAccountLink)
router.get("/stripe/account", StripeAccountController.getAccountInfo)

// Movie
router.post("/movies", AuthMiddleware.superadmin, upload("src/public/movie_posters").single('movie_poster'), MovieController.createMovie)
router.patch("/movies/:movieId", AuthMiddleware.superadmin, upload("src/public/movie_posters").single('movie_poster'), MovieController.updateMovie)
router.delete("/movies/:movieId", AuthMiddleware.superadmin, MovieController.deleteMovie)

export default router;