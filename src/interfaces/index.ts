import { UserResponseModel } from '../modules/auth/auth.model';
import { ApiProperty } from '@nestjs/swagger';
import { IncomingMessage } from 'http';

export class ExtendedRequest extends IncomingMessage {
  @ApiProperty()
  public user: UserResponseModel;
}
