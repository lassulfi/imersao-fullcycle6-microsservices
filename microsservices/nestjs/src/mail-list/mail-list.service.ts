import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMailListDto } from './dto/create-mail-list.dto';
import { MailList, MailListDocument } from './schemas/mail-list.schema';

@Injectable()
export class MailListService {
  constructor(
    @InjectModel(MailList.name) private mailListModel: Model<MailListDocument>,
  ) {}

  async create({ emails }: CreateMailListDto) {
    const mails = await this.findOne();
    if (!mails) {
      return this.mailListModel.create({ emails });
    }
    await mails.update({ emails }).exec();
    return mails;
  }

  async findOne() {
    const mails = await this.mailListModel.find().exec();
    return mails.length ? mails[0] : null;
  }
}
