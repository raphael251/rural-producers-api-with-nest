import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { BusinessError } from 'src/errors/business.error';

@Injectable()
export class BusinessErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof BusinessError) {
          throw new BadRequestException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
