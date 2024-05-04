import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

import { FileUploaderService } from './file-uploader.service';
import { FileUploaderController } from './file-uploader.controller';

import { FileUploaderFactory } from './file-uploader.factory';
import { FileModel, FileSchema } from './file.model';
import { FileUploaderRepository } from './file-uploader.repository';

const SERVE_ROOT = '/static';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>(
          'application.uploadDirectory'
        );
        return [
          {
            rootPath,
            serveRoot: SERVE_ROOT,
            serveStaticOptions: {
              fallthrough: true,
              etag: true,
            },
          },
        ];
      },
    }),
    MongooseModule.forFeature([{ name: FileModel.name, schema: FileSchema }]),
  ],
  providers: [FileUploaderService, FileUploaderRepository, FileUploaderFactory],
  controllers: [FileUploaderController],
})
export class FileUploaderModule {}
