import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotifyConfigModule, getMongooseOptions } from '@project/notify-config';

import { EmailSubscriberModule } from '@project/email-subscriber';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotifyConfigModule,
    EmailSubscriberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
