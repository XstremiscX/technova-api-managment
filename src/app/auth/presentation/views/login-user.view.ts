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

    getEmail():string{
        return this.userEmail;
    }

    getHashedPassword():string{
        return this.userPassword;
    }

    getUserType():number{
        return this.userType;
    }
}