import { Global, Module } from '@nestjs/common';
import { BilldeskService } from './billdesk.service';
import { BilldeskController } from './billdesk.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BilldeskResponse, BilldeskResponseSchema } from './schema/billdesk.response.schema';

@Global()
@Module({
  controllers: [BilldeskController],
  imports: [MongooseModule.forFeature([{ name: BilldeskResponse.name, schema: BilldeskResponseSchema }])],
  providers: [BilldeskService],
  exports: [BilldeskService],
})
export class BilldeskModule {}
