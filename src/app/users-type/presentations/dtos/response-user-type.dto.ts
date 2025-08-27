import { Exclude, Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class UserTypeResponseDto{
    
    @Expose()
    @ApiProperty({description:"User type id", example:"123s-1r32r-asdq2-das435"})
    id:string;

    @Expose()
    @ApiProperty({description:"user type name", example:"buyer"})
    name:string;

    // The description of the type is excluded because it is not useful to users; it is only necessary for programmers or DBAs to understand what each type of user is.
    @Exclude()
    description:string;

}