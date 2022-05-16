import { Controller, Get } from '@nestjs/common';
import { Unprotected } from 'nest-keycloak-connect';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Unprotected()
  @Get('health')
  getHello(): Record<string, string> {
    return this.appService.getHealth();
  }
}
