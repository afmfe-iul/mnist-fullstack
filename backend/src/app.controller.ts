import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async predictMnist(@Body() input: number[]): Promise<number> {
    return await this.appService.predictMnist(input);
  }
}
