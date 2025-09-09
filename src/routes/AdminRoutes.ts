import { Router } from "express";
import { StripeAccountController } from "../controllers/Admin/Stripe/AccountController";
import { MovieController } from "../controllers/Admin/Movie/MovieController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { upload } from "../utils/multer.utils";
const router = Router();

// Stripe
router.patch("/stripe/account", StripeAccountController.createAccount)
router.patch("/stripe/account-link", StripeAccountController.createAccountLink)
router.get("/stripe/account", StripeAccountController.getAccountInfo)

// Movie
router.post("/movies", AuthMiddleware.superadmin, upload("src/public/movie_posters").single('movie_poster'), MovieController.createMovie)

export default router;