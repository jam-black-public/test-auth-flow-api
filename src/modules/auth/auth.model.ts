import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseModel {
  @ApiProperty()
  public email: string;

  @ApiProperty()
  public firstName: string;

  @ApiProperty()
  public lastName: string;

  @ApiProperty()
  public phoneNumber: string;

  @ApiProperty()
  public companyName: string;

  @ApiPropertyOptional()
  public companyAddress: string;

  @ApiPropertyOptional()
  public city: string;

  @ApiPropertyOptional()
  public state: string;

  @ApiPropertyOptional()
  public zip: string;
}

export class RegisterPayload extends UserResponseModel {
  @ApiProperty()
  public password: string;
}

export class UserDBModel extends RegisterPayload {
  @ApiProperty()
  public createdAt: string;
}

export class LoginPayload {
  @ApiProperty()
  public email: string;

  @ApiProperty()
  public password: string;
}

export class LoginResponse {
  @ApiProperty()
  public token: string;
}

export class TokenPayload {
  @ApiProperty()
  public exp: number;

  @ApiProperty()
  public data: UserResponseModel;
}
