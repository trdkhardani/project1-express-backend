import Stripe from "stripe";
import dotenv from 'dotenv'
import type { StripeAccountCreationData, StripeCheckoutData } from "../models/stripe";
dotenv.config()

const STRIPE_TEST_SECRET_KEY = process.env.STRIPE_TEST_SECRET_KEY as string
const BASE_URL = process.env.BASE_URL as string
const PORT = process.env.PORT

export class StripeInstance {
    static stripe = new Stripe(STRIPE_TEST_SECRET_KEY)
    static async createStripeAccount(accountCreationData: StripeAccountCreationData) {
        const account = await this.stripe.accounts.create({
            business_profile: {
                name: `Moovee-Oh - ${accountCreationData.businessName}`
            },
            country: accountCreationData.country || 'sg',
            default_currency: accountCreationData.defaultCurrency || 'sgd',
            controller: {
                losses: {
                    payments: 'stripe'
                },
                stripe_dashboard: {
                    type: 'full'
                },
                fees: {
                    payer: 'account'
                },
                requirement_collection: 'stripe'
            },
        });

        return account;
    };

    static async createAccountLink(accountId: string) {
        const accountLink = await this.stripe.accountLinks.create({
            account: accountId,
            refresh_url: `${BASE_URL}:${PORT}/temporary/stripe/account-link/refresh-url`,
            return_url: `${BASE_URL}:${PORT}/temporary/stripe/account-link/return-url`,
            type: "account_onboarding"
        })

        return accountLink;
    }

    static async createShowtimeCheckoutSession(stripeCheckoutData: StripeCheckoutData) {
        const session = await this.stripe.checkout.sessions.create({
            success_url: `${BASE_URL}:${PORT}/temporary/stripe/payment-success/${stripeCheckoutData.bookingId}`,
            cancel_url: `${BASE_URL}:${PORT}/temporary/stripe/cancel-payment/${stripeCheckoutData.bookingId}`,
            line_items: [
                {
                    price_data: {
                        currency: 'idr',
                        product_data: {
                            name: `Ticket(s) for ${stripeCheckoutData.movieTitle} Movie`,
                            description: `${stripeCheckoutData.quantity} ticket(s) in ${stripeCheckoutData.theater} - ${stripeCheckoutData.cinemaChain} theater | Seat(s): ${stripeCheckoutData.seats}`,
                            metadata: {
                                movie_title: stripeCheckoutData.movieTitle,
                                theater: stripeCheckoutData.theater,
                                cinema_chain: stripeCheckoutData.cinemaChain,
                                seats: stripeCheckoutData.seats
                            }
                        },
                        unit_amount: stripeCheckoutData.amount * 100 // idk why it have to be multiplied by 100 to have correct amount per unit???
                    },
                    quantity: stripeCheckoutData.quantity,
                },
            ],
            tax_id_collection: {
                enabled: true,
                required: 'if_supported'
            },
            invoice_creation: {
                enabled: true,
                invoice_data: {
                    description: `This invoice serves as proof of your movie ticket purchase with Moovee-Oh.`,
                    issuer: {
                        type: 'self'
                    },
                    // rendering_options: {
                    //     template: "inrtem_1S1objL9krw6jmcB47b44bTn"
                    // },
                    footer: `🎬 Thank you for choosing Moovee-Oh! \n Enjoy the show, and we hope to see you again soon.`,
                    // account_tax_ids: ['txr_1S1RTlQ6EIjjIRLbO9eKkcb8'],
                    custom_fields: [
                        {
                            name: 'Booking ID',
                            value: stripeCheckoutData.bookingId.toUpperCase()
                        },
                        {
                            name: 'Movie',
                            value: stripeCheckoutData.movieTitle
                        },
                        {
                            name: 'Theater',
                            value: `${stripeCheckoutData.theater} - ${stripeCheckoutData.cinemaChain}, ${stripeCheckoutData.theaterCity}`
                        },
                        {
                            name: 'Seat(s)',
                            value: stripeCheckoutData.seats
                        }
                    ],
                    metadata: {
                        booking_id: stripeCheckoutData.bookingId
                    }
                }
            },
            customer_creation: 'always',
            // payment_method_configuration: "pmc_1S1GqvQ6EIjjIRLbqXvsvVNR",
            payment_method_types: [
                'card',
                'samsung_pay',
                'link',
                // 'paypal'
            ],
            submit_type: "book",
            mode: 'payment',
            payment_intent_data: {
                application_fee_amount: stripeCheckoutData.applicationFee * 100,
                receipt_email: stripeCheckoutData.userEmail
            },
            customer_email: stripeCheckoutData.userEmail,
            metadata: {
                booking_id: stripeCheckoutData.bookingId
            }
            },
            {
                stripeAccount: stripeCheckoutData.stripeAccountId,
            })

            return session;
    }

    static async findInvoice(bookingId: string, stripeAccountId: string) {
        const invoice = await this.stripe.invoices.search({
            query: `metadata['booking_id']:"${bookingId}"`,
        }, {
            stripeAccount: stripeAccountId
        })

        return invoice;
    }

    static async accountInfo(stripeAccountId: string) {
        const account = await this.stripe.accounts.retrieve(stripeAccountId)

        return account;
    }

    static async deleteAccount(accountId: string) {
        const account = await this.stripe.accounts.del(accountId)

        return account;
    }
}