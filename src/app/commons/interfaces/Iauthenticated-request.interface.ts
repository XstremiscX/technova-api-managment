import { Request } from 'express';
import { TokenPayloadDto } from 'src/app/auth/presentation/dtos/token-payload.dto';

export interface AuthenticatedRequest extends Request {
  user: TokenPayloadDto;
}
