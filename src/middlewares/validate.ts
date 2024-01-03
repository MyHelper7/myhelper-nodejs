import Joi from 'joi';
import { pick } from '../utils/pick';
import { ValidationError } from '../utils';

export const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    return next(new ValidationError(error.message || 'Some Keys are missing', error));
  }
  Object.assign(req, value);
  return next();
};
