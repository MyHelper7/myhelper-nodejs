import Joi from 'joi';

class AuthValidation {
  public register = {
    body: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().optional(),
      referenceCode: Joi.string().optional(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }

  public login = {
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }

  public forgotPassword = {
    body: Joi.object().keys({
      email: Joi.string().required(),
    }),
  }

  public resetPassword = {
    body: Joi.object().keys({
      resetId: Joi.string().required(),
      newPassword: Joi.string().required(),
      confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().strict()
        .messages({'any.only': 'Password not same'}),
    }),
  }
}

export const authValidation = new AuthValidation();
