import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import applicationConfig from './api-config';

const ENV_API_GATEWAY_FILE_PATH = 'apps/api/api.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig],
      envFilePath: ENV_API_GATEWAY_FILE_PATH,
    }),
  ],
})
export class ApiGatewayConfigModule {}
