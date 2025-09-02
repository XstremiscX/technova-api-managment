import { ApiProperty } from '@nestjs/swagger';
import { DeletedResult } from 'src/app/commons/utils/enums/deleted-resutls.enum';

export class DeleteBrandResponseDto {
  
  @ApiProperty({ enum:DeletedResult, description: 'Result status', example: DeletedResult.DELETED })
  result: DeletedResult;

  @ApiProperty({ example: 'Brand deleted successfully', description: 'Confirmation message' })
  message: string;

}
