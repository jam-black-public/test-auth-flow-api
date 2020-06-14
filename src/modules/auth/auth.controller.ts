import { Body, Controller, Get, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { AuthService } from './auth.service';
import { RegisterPayload, LoginPayload, UserResponseModel, LoginResponse } from './auth.model';
import { ApiBody } from '@nestjs/swagger';
import { RegisterUserDto, LoginUserDto } from '../../pipes';
import { ExtendedRequest } from '../../interfaces';

@Controller('/auth')
export class AuthController {
  constructor(private service: AuthService) {
    console.log('CREATED AuthController');
  }

  @Post('/register')
  @ApiBody({ type: RegisterPayload })
  @UsePipes(new ValidationPipe())
  public async register(@Req() request: IncomingMessage, @Body() payload: RegisterUserDto): Promise<LoginResponse> {
    console.debug(`"Received "POST /register" request to create new user`);

    return await this.service.register(payload);
  }

  @Post('/login')
  @ApiBody({ type: LoginPayload })
  @UsePipes(new ValidationPipe())
  public async login(@Req() request: IncomingMessage, @Body() payload: LoginUserDto): Promise<LoginResponse> {
    console.debug(`"Received "POST /login" request to authorize user`);

    return this.service.login(payload.email, payload.password);
  }

  @Get('/profile')
  public async getUserInfo(@Req() request: ExtendedRequest): Promise<UserResponseModel> {
    console.debug(`"Received "GET /profile" request to get user info`);

    return request.user;
  }
}
