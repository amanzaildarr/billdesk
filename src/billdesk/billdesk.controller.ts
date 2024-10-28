import { Controller, Get, Post, Req } from '@nestjs/common';
import { BilldeskService } from './billdesk.service';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('billdesk')
@ApiExcludeController()
export class BilldeskController {
  constructor(private readonly billdeskService: BilldeskService) {}

  @Post('api-hit')
  billdeskApiHit(@Req() req: Request) {
    return this.billdeskService.billdeskApiHit(req);
  }

  @Post('response')
  billdeskGetResponse(@Req() req: Request) {
    console.log('response billdesk', req);
    return this.billdeskService.billdeskGetResponse(req);
  }

  @Get('list')
  list() {
    return this.billdeskService.list();
  }

  // @Post('success')
  // async billdeskSuccess(@Req() req: Request) {
  //   return this.billdeskService.billdeskSuccess(req);
  // }

  // @Post('failed')
  // async billdeskFailed(@Req() req: Request) {
  //   return this.billdeskService.billdeskFailed(req);
  // }
}
