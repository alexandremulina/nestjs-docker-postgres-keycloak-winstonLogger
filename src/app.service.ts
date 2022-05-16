import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  logger: Logger;
  constructor() {
    this.logger = new Logger();
  }
  getHealth(): Record<string, string> {
    return { health: 'ok' };
  }
}
