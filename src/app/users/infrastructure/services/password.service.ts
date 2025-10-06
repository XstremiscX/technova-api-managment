import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { BussinessError } from "src/app/commons/error_management/bussines errors/bussines-error";

// Service for handling password-related operations
@Injectable()
export class PasswordService{

    // Compares a new password with the current hashed password
    comparePasswords(newPassword:string, currentPassword:string):boolean{
        // Compare a plain text password with a hashed password using bcrypt.
        const isSamePassword = bcrypt.compareSync(newPassword, currentPassword);

        if(isSamePassword)throw new BussinessError("The new password must be different from the current password.");

        return isSamePassword;
    }

    // Hashes a plain text password using bcrypt
    hashPassword(password:string):string{
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    // Verifies a plain password against a hashed password
    verifyPassword(password:string,hashedPassword:string): boolean{

        const isValid = bcrypt.compareSync(password,hashedPassword);
        
        return isValid;
    }
}