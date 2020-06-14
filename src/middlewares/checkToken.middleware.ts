import * as jwt from 'jsonwebtoken';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IncomingMessage, ServerResponse } from 'http';
import { TokenPayload } from '../modules/auth';
import { ERRORS, JWT_SECRET } from '../constants';

@Injectable()
export class CheckTokenMiddleware implements NestMiddleware {
  constructor() {}

  public async use(
    request: IncomingMessage & { user: any; cookies: { [key: string]: string } },
    response: ServerResponse,
    next: (error?: HttpException) => void,
  ) {
    if (request.method === 'OPTIONS') {
      return next();
    }

    const token = request.headers.authorization;

    if (!token) {
      return next(new HttpException(ERRORS.NOT_PROVIDED_TOKEN, HttpStatus.FORBIDDEN));
    }

    try {
      const { data: user } = jwt.verify(token, JWT_SECRET) as TokenPayload;

      if (!user.email) {
        return next(new HttpException(ERRORS.FORBIDDEN, HttpStatus.UNAUTHORIZED));
      }

      request.user = { ...user, token };
      return next();
    } catch (e) {
      throw new UnprocessableEntityException(e.message);
    }
  }
}
