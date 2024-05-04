import { registerAs } from '@nestjs/config';
import { ENVIRONMENTS, DEFAULT_PORT } from '@project/core';
import * as Joi from 'joi';

export interface ApplicationConfig {
  users: string;
  blog: string;
  notify: string;
  fileStorage: string;
  port: number;
}

const validationSchema = Joi.object({
  environment: Joi.string()
    .valid(...ENVIRONMENTS)
    .required(),
  port: Joi.number().port().default(DEFAULT_PORT),
});

function validateConfig(config: ApplicationConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Application Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): ApplicationConfig {
  const config: ApplicationConfig = {
    users: process.env.USERS_SERVICE_URL,
    blog: process.env.BLOG_SERVICE_URL,
    notify: process.env.NOTIFY_SERVICE_URL,
    fileStorage: process.env.FILE_STORAGE_SERVICE_URl,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
