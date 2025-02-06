import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler<User>): Observable<any> {
    return next.handle().pipe(
      map((user) => {
        const response: Response = context.switchToHttp().getResponse<Response>();
        const access_token: string = this.jwtService.sign({
          sub: user.email,
        });

        response.setHeader('Authorization', `Bearer ${access_token}`);
        response.cookie('token', access_token, {
          httpOnly: true,
          signed: true,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        });

        return { ...user, access_token };
      }),
    );
  }
}
