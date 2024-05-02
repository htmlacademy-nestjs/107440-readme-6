import { registerAs } from '@nestjs/config';
import { ENVIRONMENTS, DEFAULT_PORT, Environment } from '@project/core';
import * as Joi from 'joi';

export interface FileStorageConfig {
  environment: string;
  port: number;
  uploadDirectory: string;
}

const validationSchema = Joi.object({
  environment: Joi.string()
    .valid(...ENVIRONMENTS)
    .required(),
  port: Joi.number().port().default(DEFAULT_PORT),
  uploadDirectory: Joi.string().required(),
});

function validateConfig(config: FileStorageConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[FileStorage Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): FileStorageConfig {
  const config: FileStorageConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
