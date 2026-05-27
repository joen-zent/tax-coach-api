import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: '헬스체크' })
  @Get('health')
  getHealth() {
    return this.appService.getHealth();
  }

  @ApiOperation({ summary: '에코 테스트 (POST body를 그대로 반환)' })
  @ApiBody({ schema: { example: { message: '안녕하세요' } } })
  @Post('test/echo')
  echo(@Body() body: object) {
    return { received: body, timestamp: new Date().toISOString() };
  }
}
