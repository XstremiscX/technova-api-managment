import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

// Service for handling password-related operations
@Injectable()
export class PasswordService{

    comparePasswords(newPassword:string, currentPassword:string):boolean{
        // Compare a plain text password with a hashed password using bcrypt.
        const isSamePassword = bcrypt.compareSync(newPassword, currentPassword);

        if(isSamePassword)throw new Error("The new password must be different from the current password.");

        return isSamePassword;
    }

    hashPassword(password:string):string{
        // Hash a plain text password using bcrypt.
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

}