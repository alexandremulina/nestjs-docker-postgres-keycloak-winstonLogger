import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { Unprotected } from 'nest-keycloak-connect';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  @Redirect('', 301)
  @Unprotected()
  login() {
    return this.authService.getUrlLogin();
  }

  @Get('callback')
  @Unprotected()
  getAccessToken(@Query('code') code: string) {
    return this.authService.getAccessToken(code);
  }
}
