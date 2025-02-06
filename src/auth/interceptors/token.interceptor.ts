import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from 'src/users/entities/user.entity';

import { AuthService } from '../auth.service';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(context: ExecutionContext, next: CallHandler<User>): Observable<any> {
    return next.handle().pipe(
      map((user) => {
        const response: Response = context.switchToHttp().getResponse<Response>();
        const token: string = this.authService.signToken(user.email);

        response.setHeader('Authorization', `Bearer ${token}`);
        response.cookie('token', token, {
          httpOnly: true,
          signed: true,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        });

        return { ...user, token };
      }),
    );
  }
}
