import { EventEmitter2 } from "@nestjs/event-emitter";
import { UserCreatedEvent } from "../../application/events/user-created.event";
import { Injectable } from "@nestjs/common";

// Service responsible for emitting the UserCreatedEvent
@Injectable()
export class UserCreatedEventService{
    
    constructor(
        private eventEmitter: EventEmitter2
    ){}

    // Emits the user.created event with relevant user data
    async emitUserCreatedEvent(userEmail:string, userId:string,userName:string):Promise<void>{

        try{

            this.eventEmitter.emit('user.created', new UserCreatedEvent(userEmail,userId,userName));

            console.log(`UserCreatedEvent emitted for user ${userId}`);

        }catch(e){
            console.error(e);
        }
        

    }

}
