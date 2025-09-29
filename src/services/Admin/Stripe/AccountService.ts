import type { ResponseInterface } from "../../../models/response.ts";
import { anyErrorResponse, conflictResponse, internalServerErrorResponse, successResponse } from "../../../utils/response.utils.ts";
import { StripeInstance } from "../../../utils/stripe.utils.ts";
import { PrismaClient } from "../../../generated/prisma/index.js";
const prisma = new PrismaClient();

export class StripeAccountService {
    static async createAccount(adminId: string, country: string, currency: string):Promise<ResponseInterface<{}>> {
        try {
            const admin = await prisma.admin.findUnique({
                select: {
                    cinema_chain: {
                        select: {
                            cinema_chain_id: true,
                            cinema_chain_brand: true,
                            cinema_chain_stripe_account_id: true,
                        }
                    }
                },
                where: {
                    admin_id: adminId
                }
            })

            if(admin?.cinema_chain.cinema_chain_stripe_account_id) {
                return conflictResponse("Stripe account already exists")
            }

            const stripeAccount = await StripeInstance.createStripeAccount({
                businessName: admin?.cinema_chain.cinema_chain_brand as string,
                country: country,
                defaultCurrency: currency
            })
            .then((data) => {
                return data;
            })

            const cinemaChain = await prisma.cinema_Chain.update({
                where: {
                    cinema_chain_id: admin?.cinema_chain.cinema_chain_id!
                },
                data: {
                    cinema_chain_stripe_account_id: stripeAccount.id
                }
            })
            
            return successResponse(cinemaChain, `Stripe account created for Cinema Chain ${admin?.cinema_chain.cinema_chain_brand}`)
        } catch(err: any) {
            console.error(err);
            if(err.statusCode) {
                return anyErrorResponse(err.statusCode, err.message)
            }
            return internalServerErrorResponse();
        }
    }

    static async createAccountLink(adminId: string):Promise<ResponseInterface<{}>> {
        try {
            const admin = await prisma.admin.findUnique({
                    select: {
                        cinema_chain: {
                            select: {
                                cinema_chain_id: true,
                                cinema_chain_brand: true,
                                cinema_chain_stripe_account_id: true,
                                cinema_chain_stripe_account_url: true,
                            }
                        }
                    },
                    where: {
                        admin_id: adminId
                    }
            })

            if(admin?.cinema_chain.cinema_chain_stripe_account_url) {
                return conflictResponse("Stripe account link already exists")
            }
    
            const accountLink = await StripeInstance.createAccountLink(admin?.cinema_chain.cinema_chain_stripe_account_id!)
            .then((data) => {
                return data
            })

            const cinemaChain = await prisma.cinema_Chain.update({
                where: {
                    cinema_chain_id: admin?.cinema_chain.cinema_chain_id!
                },
                data: {
                    cinema_chain_stripe_account_url: accountLink.url
                }
            }) 

            return successResponse(cinemaChain, `Account Link updated for Cinema Chain ${admin?.cinema_chain.cinema_chain_brand}`)
        } catch(err: any) {
            console.error(err);
            if(err.statusCode) {
                return anyErrorResponse(err.statusCode, err.message)
            }
            return internalServerErrorResponse();
        }
    }

    static async getAccountInfo(adminId: string):Promise<ResponseInterface<{}>> {
        try {
            const admin = await prisma.admin.findUnique({
                select: {
                    cinema_chain: {
                        select: {
                            cinema_chain_stripe_account_id: true
                        }
                    }
                },
                where: {
                    admin_id: adminId
                }
            })

            const account = await StripeInstance.accountInfo(admin?.cinema_chain.cinema_chain_stripe_account_id!)

            return successResponse(account)
        } catch(err: any) {
            console.error(err);
            if(err.statusCode) {
                return anyErrorResponse(err.statusCode, err.message)
            }
            return internalServerErrorResponse();
        }
    }
}