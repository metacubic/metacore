import { Email } from './email.dto';
import { ApiProperty } from '@nestjs/swagger';

export class JwtPayload extends Email {
  @ApiProperty()
  username: string;

  @ApiProperty()
  id: string;
}
