import { Module } from '@nestjs/common';
import {
  FileStorageConfigModule,
  getMongooseOptions,
} from '@project/file-storage-config';
import { FileUploaderModule } from '@project/file-uploader';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    FileUploaderModule,
    FileStorageConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
