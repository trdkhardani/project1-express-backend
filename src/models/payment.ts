export interface StripeCheckoutData {
    bookingId: string,
    amount: number, 
    quantity: number, 
    applicationFee: number, 
    userEmail: string, 
    movieTitle: string, 
    theater: string,
    theaterCity: string,
    seats: string
}