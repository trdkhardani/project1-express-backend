import type { NextFunction, Request, Response } from "express";
import { StripeAccountService } from "../../../services/Admin/Stripe/AccountService";
import type { AuthenticatedRequest } from "../../../models/auth";

export class StripeAccountController {
    static async createAccount(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const adminId = req.admin?.admin_id as string
            
            const {
                country,
                currency
            } = req.body

            const response = await StripeAccountService.createAccount(adminId, country, currency)

            return res.status(Number(response.statusCode)).json(response)
        } catch(err) {
            next(err)
        }
    }

    static async createAccountLink(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const adminId = req.admin?.admin_id as string

            const response = await StripeAccountService.createAccountLink(adminId)

            return res.status(Number(response.statusCode)).json(response)
        } catch(err) {
            next(err)
        }
    }

    static async getAccountInfo(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const adminId = req.admin?.admin_id as string

            const response = await StripeAccountService.getAccountInfo(adminId)

            return res.status(Number(response.statusCode)).json(response)
        } catch(err) {
            next(err)
        }
    }
}