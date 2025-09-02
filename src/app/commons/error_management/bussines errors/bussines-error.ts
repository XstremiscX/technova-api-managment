export class BussinessError extends Error{
    
    constructor(
        message:string,
    ){
        super(message),
        this.name = "BussinessError"
    }

}