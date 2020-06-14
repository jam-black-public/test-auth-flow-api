import * as jwt from 'jsonwebtoken';
import { HttpStatus, Injectable } from '@nestjs/common';
import { assertEx, hashPassword } from '../../utils';
import { LoginResponse, RegisterPayload } from './auth.model';
import { _1_HOUR_AFTER } from './auth.constant';
import { compare } from 'bcrypt';
import { JWT_SECRET, ERRORS } from '../../constants';

@Injectable()
export class AuthService {
  private users: any;

  constructor() {
    this.users = [];
  }

  public async register(userData: RegisterPayload): Promise<LoginResponse> {
    const { email } = userData;

    const alreadyRegistered = !!this.users.find((user: any) => user.email === email);
    assertEx(!alreadyRegistered, ERRORS.USER_ALREADY_EXISTS);

    const { password } = userData;
    const passwordHash = await hashPassword(password);

    this.users = [...this.users, { ...userData, password: passwordHash, createdAt: new Date().toString() }];

    return this.login(email, password);
  }

  public async login(email: string, password: string): Promise<LoginResponse> {
    const user = this.users.find((user: RegisterPayload) => {
      return user.email === email;
    });

    assertEx(user, ERRORS.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);

    const isPasswordCorrect = await compare(password, user.password);

    assertEx(isPasswordCorrect, ERRORS.INCORRECT_PASSWORD, HttpStatus.BAD_REQUEST);

    const { password: _password, ...returnedUser } = user;

    const token = jwt.sign(
      {
        exp: _1_HOUR_AFTER,
        data: returnedUser,
      },
      JWT_SECRET,
    );

    return { ...returnedUser, token };
  }
}
