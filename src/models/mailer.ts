export interface UserDataEmail {
    userEmail: string, 
    userName: string, 
}

export interface UserVerificationEmail extends UserDataEmail {
    userId: string
}

export interface InvoiceEmail extends UserDataEmail {
    invoiceEndpoint: string
}