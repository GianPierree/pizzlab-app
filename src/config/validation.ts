import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('local', 'development', 'production').default('local'),
  PORT: Joi.string().default('3000'),
  MONGO_URI: Joi.string().required(),
  PG_HOST: Joi.string().required(),
  PG_PORT: Joi.string().default('5432'),
  PG_USER: Joi.string().required(),
  PG_PASSWORD: Joi.string().required(),
  PG_DATABASE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.string().default('1h'),
});
