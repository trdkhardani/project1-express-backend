import { Router } from "express";
import { StripeAccountController } from "../controllers/Admin/Stripe/AccountController";
const router = Router();

// Stripe
router.patch("/stripe/account", StripeAccountController.createAccount)
router.patch("/stripe/account-link", StripeAccountController.createAccountLink)

export default router;