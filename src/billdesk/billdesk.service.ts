import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as jws from 'jws';
import { BilldeskProductType } from './enum/billdesk.enum';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BilldeskResponse } from './schema/billdesk.response.schema';

@Injectable()
export class BilldeskService {
  private secretKey: string;
  private merchantName: string;
  private merchantId: string;
  private clientId: string;
  private billdeskUrl: string;
  private returnUrl: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectModel(BilldeskResponse.name)
    private readonly billdeskResponseModel: Model<BilldeskResponse>,
  ) {
    this.secretKey = this.configService.get<string>('BILLDESK_SECRET');
    this.merchantName = this.configService.get<string>('BILLDESK_MERCHANT_NAME');
    this.merchantId = this.configService.get<string>('BILLDESK_MERCHANT_ID');
    this.clientId = this.configService.get<string>('BILLDESK_CLIENT_ID');
    this.billdeskUrl = this.configService.get<string>('BILLDESK_URL');
    this.returnUrl = this.configService.get<string>('BILLDESK_RU');
  }

  private orderDate(): string {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
      timeZone: 'Asia/Kolkata',
    };

    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const parts = formatter.formatToParts(now);

    // Extract the parts into an object
    const dateParts: { [key: string]: string } = {};
    parts.forEach(({ type, value }) => {
      dateParts[type] = value;
    });

    // Construct the date string
    const year = dateParts.year;
    const month = dateParts.month;
    const day = dateParts.day;
    const hours = dateParts.hour;
    const minutes = dateParts.minute;
    const seconds = dateParts.second;

    const timezoneOffsetSign = '+';
    const timezoneOffsetHours = '05';
    const timezoneOffsetMinutes = '30';
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneOffsetSign}${timezoneOffsetHours}:${timezoneOffsetMinutes}`;
  }

  async billdeskApiHit(req: Request, type: string = 'lab_booking') {
    let ip = req.headers['x-forwarded-for'] || req['socket'].remoteAddress || req['connection'].remoteAddress;
    // If there are multiple IPs in x-forwarded-for, take the first one
    if (Array.isArray(ip)) ip = ip[0];
    else if (typeof ip === 'string' && ip.includes(',')) ip = ip.split(',')[0];

    const orderId = Math.floor(new Date().getTime() / 1000);
    const traceid = `${Math.random().toString(20).substring(2)}${Math.random().toString(20).substring(2)}`;

    const payload = {
      mercid: this.merchantId,
      orderid: orderId,
      amount: '100',
      order_date: this.orderDate(),
      currency: '356',
      ru: this.returnUrl,
      additional_info: {
        additional_info1: type,
        additional_info2: 'This is test',
        additional_info3: 'this will be user Id',
        additional_info4: 'NA',
        additional_info5: 'NA',
        additional_info6: 'NA',
        additional_info7: 'NA',
        additional_info8: 'NA',
        additional_info9: 'NA',
        additional_info10: 'NA',
      },
      itemcode: 'DIRECT',
      device: {
        init_channel: 'internet',
        ip: ip,
        user_agent: 'Mozilla/5.0(WindowsNT10.0;WOW64;rv:51.0)Gecko/20100101Firefox/ 51.0',
        accept_header: 'text/html',
        browser_tz: '-330',
        browser_color_depth: '32',
        browser_java_enabled: 'false',
        browser_screen_height: '601',
        browser_screen_width: '657',
        browser_language: 'en-US',
        browser_javascript_enabled: 'true',
      },
    };

    const signaturePayload = jws.sign({
      header: { alg: 'HS256', clientid: this.clientId },
      payload: payload,
      secret: this.secretKey,
    });

    try {
      const axiosHeaders = {
        algorithm: 'HS256',
        headers: {
          'Content-Type': 'application/jose',
          accept: 'application/jose',
          'BD-Traceid': traceid,
          'BD-Timestamp': Math.floor(new Date().getTime() / 1000),
        },
      };

      const response = await axios.post(this.billdeskUrl, signaturePayload, axiosHeaders);
      const payloadDecoded = jws.decode(response.data);
      const billdeskInfo = JSON.parse(payloadDecoded.payload);
      return {
        bdorderid: billdeskInfo.bdorderid,
        merchantId: billdeskInfo.mercid,
        authToken: billdeskInfo.links[1].headers.authorization,
        billdesk_tmp_data: { ...billdeskInfo, ip },
      };
    } catch (error) {
      const payloadDecoded = jws.decode(error.response.data);
      const data = JSON.parse(payloadDecoded.payload);
      if (data) throw new HttpException(data.message, data.status);
      throw new BadRequestException(error.message);
    }
  }

  async createOrder(
    req: Request,
    productType: BilldeskProductType,
    id: Types.ObjectId,
    amount: number,
    userId: string,
  ) {
    let ip = req.headers['x-forwarded-for'] || req['socket'].remoteAddress || req['connection'].remoteAddress;
    if (Array.isArray(ip)) ip = ip[0];
    else if (typeof ip === 'string' && ip.includes(',')) ip = ip.split(',')[0];

    const timeStamp = Math.floor(new Date().getTime() / 1000);
    const traceid = `${Math.random().toString(20).substring(2)}${Math.random().toString(20).substring(2)}`;

    const payload = {
      mercid: this.merchantId,
      orderid: timeStamp,
      amount: amount.toString(),
      order_date: this.orderDate(),
      currency: '356',
      ru: this.returnUrl,
      additional_info: {
        additional_info1: userId, // user id
        additional_info2: productType, // product type: payment for lab or doctor
        additional_info3: id, //  booking Id
        additional_info4: 'NA',
        additional_info5: 'NA',
        additional_info6: 'NA',
        additional_info7: 'NA',
        additional_info8: 'NA',
        additional_info9: 'NA',
        additional_info10: 'NA',
      },
      itemcode: 'DIRECT',
      device: {
        init_channel: 'internet',
        ip: ip,
        user_agent: 'Mozilla/5.0(WindowsNT10.0;WOW64;rv:51.0)Gecko/20100101Firefox/ 51.0',
        accept_header: 'text/html',
        browser_tz: '-330',
        browser_color_depth: '32',
        browser_java_enabled: 'false',
        browser_screen_height: '601',
        browser_screen_width: '657',
        browser_language: 'en-US',
        browser_javascript_enabled: 'true',
      },
    };

    const signaturePayload = jws.sign({
      header: { alg: 'HS256', clientid: this.clientId },
      payload: payload,
      secret: this.secretKey,
    });

    try {
      const axiosHeaders = {
        algorithm: 'HS256',
        headers: {
          'Content-Type': 'application/jose',
          accept: 'application/jose',
          'BD-Traceid': traceid,
          'BD-Timestamp': timeStamp,
        },
      };

      const response = await axios.post(this.billdeskUrl, signaturePayload, axiosHeaders);
      const payloadDecoded = jws.decode(response.data);
      const billdeskInfo = JSON.parse(payloadDecoded.payload);
      return {
        bdorderid: billdeskInfo.bdorderid,
        merchantId: billdeskInfo.mercid,
        authToken: billdeskInfo.links[1].headers.authorization,
        ru: billdeskInfo.ru,
        billdesk_tmp_data: { ...billdeskInfo },
      };
    } catch (error) {
      const payloadDecoded = jws.decode(error.response.data);
      const data = JSON.parse(payloadDecoded.payload);
      if (data) throw new HttpException(data.message, data.status);
      throw new BadRequestException(error.message);
    }
  }

  async billdeskGetResponse(req: Request) {
    // const orderId = req.body.orderid;
    const res = new this.billdeskResponseModel({ success: true });
    res.save();
    const transaction_response = req.body['transaction_response'];
    const payloadDecoded = jws.decode(transaction_response);
    const data = JSON.parse(payloadDecoded.payload);
    res.transaction_response = JSON.stringify(transaction_response);
    res.payloadDecoded = JSON.stringify(payloadDecoded);
    res.response = JSON.stringify(data);
    res.save();
    return data;
  }

  async list() {
    const records = await this.billdeskResponseModel.find({});
    return { total: records.length, records };
  }

  // async billdeskSuccess(req: any) {
  //   return 'success';
  // }

  // async billdeskFailed(req: any) {
  //   return { m: 'failed', host: req['headers']['host'] };
  // }
}
