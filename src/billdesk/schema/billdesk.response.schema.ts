import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BilldeskResponseDocument = HydratedDocument<BilldeskResponse>;

@Schema({ timestamps: true, validateBeforeSave: true, autoIndex: true, toJSON: { virtuals: true } })
export class BilldeskResponse {
  @Prop({ type: Boolean, default: false })
  success: boolean;

  @Prop({ type: String })
  transaction_response: string;

  @Prop({ type: String })
  payloadDecoded: string;

  @Prop({ type: String })
  response: string;
}

export const BilldeskResponseSchema = SchemaFactory.createForClass(BilldeskResponse);
