export interface ITokenService{
    generateToken(id:string,email:string,type:number):string;
}