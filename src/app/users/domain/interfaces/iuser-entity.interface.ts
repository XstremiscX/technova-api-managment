export interface IUserEntity {
    id:string;
    name:string;
    email:string;
    phone:string;
    address:string;
    password:string;
    type:string;
    status:boolean; // 0:inactive 1:active
    verified:boolean; // true:verified false:unverified
    registration_date:Date;
}
