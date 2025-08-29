import Stripe from "stripe";
import dotenv from 'dotenv'
import type { StripeCheckoutData } from "../models/payment";
dotenv.config()

const STRIPE_TEST_SECRET_KEY = process.env.STRIPE_TEST_SECRET_KEY as string
const BASE_URL = process.env.BASE_URL as string
const PORT = process.env.PORT

export class StripeInstance {
    static stripe = new Stripe(STRIPE_TEST_SECRET_KEY)
    static async createStripeAccount(businessName: string, country?: string, defaultCurrency?: string) {
        const account = await this.stripe.accounts.create({
            business_profile: {
                name: businessName
            },
            country: country || 'sg',
            default_currency: defaultCurrency || 'sgd',
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
                            description: `${stripeCheckoutData.quantity} ticket(s) in ${stripeCheckoutData.theater} theater | Seat(s): ${stripeCheckoutData.seats}`,
                            metadata: {
                                movie_title: stripeCheckoutData.movieTitle,
                                theater: stripeCheckoutData.theater,
                                seats: stripeCheckoutData.seats
                            }
                        },
                        unit_amount: stripeCheckoutData.amount
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
                    rendering_options: {
                        template: "inrtem_1S1MaWQ6EIjjIRLbel2F5LMW"
                    },
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
                            value: `${stripeCheckoutData.theater}, ${stripeCheckoutData.theaterCity}`
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
            payment_method_configuration: "pmc_1S1GqvQ6EIjjIRLbqXvsvVNR",
            submit_type: "book",
            mode: 'payment',
            payment_intent_data: {
                // application_fee_amount: stripeCheckoutData.applicationFee,
                receipt_email: stripeCheckoutData.userEmail
            },
            customer_email: stripeCheckoutData.userEmail,
            metadata: {
                booking_id: stripeCheckoutData.bookingId
            }
            },
            {
                stripeAccount: "acct_1S1GqIQ6EIjjIRLb",
            })

            return session;
    }

    static async findInvoice(bookingId: string) {
        const invoice = await this.stripe.invoices.search({
            query: `metadata['booking_id']:"${bookingId}"`
        })

        return invoice;
    }

    static async listAccount() {
        const accounts = await this.stripe.accounts.list()

        return accounts;
    }

    static async deleteAccount(accountId: string) {
        const account = await this.stripe.accounts.del(accountId)

        return account;
    }
}