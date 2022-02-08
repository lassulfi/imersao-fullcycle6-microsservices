import { Module } from '@nestjs/common';
import { MailListService } from './mail-list.service';
import { MailListController } from './mail-list.controller';
import { MailList, MailListSchema } from './schemas/mail-list.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SendMailTweetsJob } from './send-mail-tweets.job';

@Module({
  controllers: [MailListController],
  providers: [MailListService, SendMailTweetsJob],
  imports: [
    MongooseModule.forFeature([
      { name: MailList.name, schema: MailListSchema },
    ]),
  ],
})
export class MailListModule {}
