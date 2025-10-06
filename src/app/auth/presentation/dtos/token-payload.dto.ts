import { ApiProperty } from "@nestjs/swagger";

// DTO representing the payload extracted from a JWT token
export class TokenPayloadDto{

    @ApiProperty({description:"User Id",example:"134jit-fsd934d-wr43-fds3"})
    userId:string

    @ApiProperty({description:"User Email",example:"exampleemail@gmail.com"})
    userEmail:string

    @ApiProperty({description:"User Type", example:"1"})
    userType:string

}