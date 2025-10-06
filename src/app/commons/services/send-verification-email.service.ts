import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

// Service responsible for sending verification emails to newly registered users
@Injectable()
export class SendVerificationEmailService{

    constructor(
        private readonly mailerService:MailerService
    ){}

    // Sends a welcome email with a verification link
    async sendVerificationEmail(email: string, name: string, id:string){
        await this.mailerService.sendMail({
            to: email,
            subject:"Welcome to technova!",
            html:`
                <h1>Welcome to Technova ${name}</h1>
                <p>Thank you for joining Technova. We hope you have a great experience with us.</p>

                <p>To log in to the page, first verify your email address by clicking the button below.</p>
                <a href="http://localhost:3000/auth/${id}" style="">Verify</a>
            `
        })
    }

}