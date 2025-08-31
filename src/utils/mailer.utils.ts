import nodemailer, { type SendMailOptions } from 'nodemailer'
import type { InvoiceEmail, UserVerificationEmail } from '../models/mailer'

const {
    EMAIL_USER,
    EMAIL_PASS,
    BASE_URL,
    PORT
} = process.env

export class MailerUtils {
    static sendEmail = (mailOptions: SendMailOptions) => {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: EMAIL_USER,
                    pass: EMAIL_PASS
                }
            })
        
            transporter.sendMail(mailOptions, (err, info) => {
                if(err) {
                    throw err;
                } else {
                    console.log(`Email sent ${info.response}`)
                }
            })
        } catch(err) {
            return console.error(err)
        }
    }
    
    static sendUserVerificationEmail = (emailData: UserVerificationEmail) => {
        const verificationLink = `${BASE_URL}:${PORT}/api/v1/auth/register/verify/${emailData.userId}`

        this.sendEmail({
            from: "Moovee-Oh <no-reply@mooveeoh.com>",
            sender: "no-reply@mooveeoh.com",
            to: emailData.userEmail,
            subject: "Account Verification",
            html: `
                <div style="font-family: Arial, sans-serif; line-height:1.6; max-width:600px; margin:auto; padding:20px; border:1px solid #eee; border-radius:8px;">
                    <h2 style="color:#333;">Welcome to Moovee-Oh 🎬</h2>
                    <p>Hi ${emailData.userName || "there"},</p>
                    <p>Thanks for signing up! To activate your account, please verify your email address by clicking the button below:</p>
                    <div style="text-align:center; margin:30px 0;">
                    <a href="${verificationLink}" 
                    style="background:#e50914; color:#fff; text-decoration:none; padding:12px 24px; border-radius:6px; font-weight:bold;">
                    Verify My Account
                    </a>
                    </div>
                    <p>If the button above doesn't work, copy and paste this link into your browser:</p>
                    <p style="word-break:break-all; color:#555;">${verificationLink}</p>
                    <hr style="margin:30px 0; border:none; border-top:1px solid #eee;" />
                    <p style="font-size:12px; color:#888;">
                    This link will expire in 1 hour. If you didn’t create an account with Moovee-Oh, you can safely ignore this email.
                    </p>
                </div>
            `
        })
    }

    static sendInvoiceEmail = (emailData: InvoiceEmail) => {
        this.sendEmail({
            from: "Moovee-Oh <no-reply@mooveeoh.com>",
            sender: "no-reply@mooveeoh.com",
            to: emailData.userEmail,
            subject: "Your Moovee-Oh Receipt & Invoice",
            html: `<div style="font-family: Arial, sans-serif; line-height:1.6; max-width:600px; margin:auto; padding:20px; border:1px solid #eee; border-radius:8px;">
            <h2 style="color:#333;">Your Moovee-Oh Invoice 🎟️</h2>
            <p>Hi ${emailData.userName || "there"},</p>
            <p>Thanks for your purchase! Your invoice is now available. You can view and download it securely using the button below:</p>
            
            <div style="text-align:center; margin:30px 0;">
                <a href="${BASE_URL}:${PORT}/${emailData.invoiceEndpoint}" 
                style="background:#e50914; color:#fff; text-decoration:none; padding:12px 24px; border-radius:6px; font-weight:bold;">
                View My Invoice
                </a>
            </div>

            <p>If the button above doesn’t work, copy and paste this link into your browser:</p>
            <p style="word-break:break-all; color:#555;">${BASE_URL}:${PORT}/${emailData.invoiceEndpoint}</p>
            
            <hr style="margin:30px 0; border:none; border-top:1px solid #eee;" />
            <p style="font-size:12px; color:#888;">
                This invoice link will remain available for your records. If you didn’t make this purchase or believe this email was sent to you by mistake, please ignore it.
            </p>
            </div>
            `
        })
    }
}
