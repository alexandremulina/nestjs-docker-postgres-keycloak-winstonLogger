import {
  Injectable,
  Inject,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Logger } from 'winston';
import { Observable } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(@Inject('winston') private logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.log(context.switchToHttp().getRequest());
    return next.handle();
  }
  private log(req) {
    if (req.body) {
      // const body = { ...req.body.companyCNPJ }
      const user = req.user;
      const userEmail = user ? user.email : null;
      this.logger.info(`
			  timestamp: ${new Date().toISOString()}
			  method: ${req.method},
			  route: ${req.route.path},
			  body: ${req.body.companyCNPJ},
			  query: ${JSON.stringify(req.query)},
			  params: ${JSON.stringify(req.params)},
			  from: ${req.ip},
			  madeBy: ${userEmail},
			`);
    } else {
      this.logger.info(`
			timestamp: ${new Date().toISOString()}
			body:${JSON.stringify(req)}`);
    }
  }
}
