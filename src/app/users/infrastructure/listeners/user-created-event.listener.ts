import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { SendVerificationEmailService } from "src/app/commons/services/send-verification-email.service";
import { UserCreatedEvent } from "../../application/events/user-created.event";

@Injectable()
export class UserCreatedEventListener{
    constructor(private readonly sendMail : SendVerificationEmailService){}

    @OnEvent('user.created')
    async handleSendVerificationEmail(event: UserCreatedEvent){
        await this.sendMail.sendVerificationEmail(event.userEmail,event.name,event.id);
    }
}