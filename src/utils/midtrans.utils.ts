import axios from 'axios'
import midtransClient from 'midtrans-client';
import type { MidtransCheckoutData } from '../models/midtrans';
import { DateTimeUtils } from './datetime.utils';
const {
    BASE_URL,
    PORT,
    MIDTRANS_SERVER_KEY,
    MIDTRANS_CLIENT_KEY,
    MIDTRANS_API_URL
} = process.env

// export enum HttpMethod {
//     GET='get',
//     POST='post',
//     PUT='put',
//     PATCH='patch',
//     DELETE='delete'
// }

let coreApi = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: MIDTRANS_SERVER_KEY as string,
    clientKey: MIDTRANS_CLIENT_KEY as string
})

let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: MIDTRANS_SERVER_KEY as string,
    clientKey: MIDTRANS_CLIENT_KEY as string
})

export class MidtransInstance {
    static async snap(data: any, endpoint: string) {
        const snap = axios.request({
            method: 'post',
            url: `${MIDTRANS_API_URL}/snap/${endpoint}`,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Basic ${Buffer.from(MIDTRANS_SERVER_KEY as string).toString('base64')}`
            },
            data: data
        })
        .then((data) => {
            return data;
        })
        .catch((err: any) => {
            console.error(err.response.data);
        })
        
        return snap;
    }

    static async createShowtimeCheckoutSnap(checkoutData: MidtransCheckoutData) {
        // const orderId = `${checkoutData.cinemaChain}-${checkoutData.bookingId}`
        // const orderId = `ORD_${checkoutData.bookingId}`

        let transactionParams = {
            transaction_details: {
                order_id: checkoutData.bookingId,
                gross_amount: checkoutData.amount * checkoutData.quantity
            },
            item_details: [
                {
                    id: checkoutData.showtimeId,
                    price: checkoutData.amount,
                    quantity: checkoutData.quantity,
                    name: `${checkoutData.movieTitle} (${checkoutData.seats})`,
                    category: "Tickets",
                    merchant_name: checkoutData.cinemaChain,
                }
            ],
            customer_details: {
                email: checkoutData.userEmail
            },
            callbacks: {
                finish: `${BASE_URL}:${PORT}/temporary/stripe/payment-success/${checkoutData.bookingId}?payment_gateway=midtrans`,
            },
            expiry: {
                duration: 1,
                unit: "hour",
            },
            page_expiry: {
                duration: 1,
                unit: "hour",
            },
        }
        const transaction = await snap.createTransaction(transactionParams)

        let invoiceParams = {
            order_id: checkoutData.bookingId,
            invoice_number: `INV_${checkoutData.bookingId}`,
            invoice_date: checkoutData.bookingDate,
            due_date: checkoutData.bookingDueDate,
            invoice_title: `Moovee-Oh | Invoice`,
            invoice_paid_title: `Moovee-Oh | Receipt`,
            customer_details: {
                id: checkoutData.userId,
                name: checkoutData.userName,
                email: checkoutData.userEmail
            },
            item_details: [
                {
                    item_id: checkoutData.showtimeId.slice(0, 30),
                    description: `${checkoutData.movieTitle} (${checkoutData.seats})`,
                    quantity: checkoutData.quantity,
                    price: checkoutData.amount,
                }
            ],
            payment_type: "payment_link",
            payment_link: "https://paymentlink.comz"
            // amount: ""
        }

        const merchantServerKey = `${MIDTRANS_SERVER_KEY}:`
        const invoice = axios.post("https://api.sandbox.midtrans.com/v1/invoices", invoiceParams, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Basic ${Buffer.from(merchantServerKey).toString('base64')}`
            }
        })
        .then((response) => {
            return response;
        })
        .catch((err: any) => {
            console.error(err.response.data);
        })

        return {transaction, invoice}
    }
}