import Joi from 'joi';
import { pick } from '../utils/pick';
import { ValidationError } from '../utils';
import { appHelper } from '../helpers';

export const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    let message = error.message || 'Some Keys are missing';
    for (const detail of error.details) {
      const key = detail.path?.[1]?.toString();
      message = message.replace(key, appHelper.camelToSnake(key));
    }
    return next(new ValidationError(message, error));
  }
  Object.assign(req, value);
  return next();
};
