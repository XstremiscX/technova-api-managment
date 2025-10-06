// View model representing a user during login validation
export class LoginUserView{
    constructor(
        public readonly id:string,
        private userEmail:string,
        private userPassword:string,
        private userType:number
    ){
        this.userEmail = userEmail,
        this.userPassword = userPassword
    }

    // Returns the user's email
    getEmail():string{
        return this.userEmail;
    }

    // Returns the user's hashed password
    getHashedPassword():string{
        return this.userPassword;
    }

    // Returns the user's type (e.g., ADMIN, SELLER, BUYER)
    getUserType():number{
        return this.userType;
    }
}