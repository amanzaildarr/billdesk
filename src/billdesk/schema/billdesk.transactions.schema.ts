import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BilldeskProductType } from '../enum/billdesk.enum';
import { LabBooking, LabBookingDocument } from 'src/lab-bookings/schema/lab-bookings.schema';
import { User, UserDocument } from 'src/user/schema/user.schema';

export type BilldeskTransactionsDocument = HydratedDocument<BilldeskTransactions>;

@Schema({ timestamps: true, validateBeforeSave: true, autoIndex: true, toJSON: { virtuals: true } })
export class BilldeskTransactions {
  @Prop({ enum: BilldeskProductType, required: true })
  productType: BilldeskProductType;

  @Prop({ type: Date, required: true })
  transactionDate: Date;

  @Prop({ type: String, required: true })
  surcharge: string;

  @Prop({ type: String, required: true })
  paymentMethodType: string;

  @Prop({ type: String, required: true })
  amount: string;

  @Prop({ type: String, required: true })
  ru: string;

  @Prop({ type: String, required: true })
  orderId: string;

  @Prop({ type: String, required: true })
  bankRefNo: string;

  @Prop({ type: String, required: true })
  transactionId: string;

  @Prop({ type: String, required: true })
  bankId: string;

  @Prop({ type: String, required: true })
  chargeAmount: string;

  @Prop({ type: Types.ObjectId, ref: LabBooking.name })
  labBooking: LabBookingDocument | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: UserDocument | Types.ObjectId;
}

export const BilldeskTransactionsSchema = SchemaFactory.createForClass(BilldeskTransactions);
