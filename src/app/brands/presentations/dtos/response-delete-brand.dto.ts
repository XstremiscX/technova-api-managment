import { ApiProperty } from '@nestjs/swagger';

export class DeleteBrandResponseDto {
  @ApiProperty({ example: 'deleted', description: 'Result status' })
  result: string;

  @ApiProperty({ example: 'Brand deleted successfully', description: 'Confirmation message' })
  message: string;
}
