import type { NextFunction, Request, Response } from "express";
import { StripeAccountService } from "../../../services/Admin/Stripe/AccountService";

export class StripeAccountController {
    static async createAccount(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                admin_id,
                country,
                currency
            } = req.body

            const response = await StripeAccountService.createAccount(admin_id, country, currency)

            return res.status(Number(response.statusCode)).json(response)
        } catch(err) {
            next(err)
        }
    }

    static async createAccountLink(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                admin_id,
            } = req.body

            const response = await StripeAccountService.createAccountLink(admin_id)

            return res.status(Number(response.statusCode)).json(response)
        } catch(err) {
            next(err)
        }
    }

    static async getAccountInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                admin_id,
            } = req.body

            const response = await StripeAccountService.getAccountInfo(admin_id)

            return res.status(Number(response.statusCode)).json(response)
        } catch(err) {
            next(err)
        }
    }
}