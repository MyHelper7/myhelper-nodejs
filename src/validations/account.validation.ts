import Joi from 'joi';

class AccountValidation {
  public updateAccount = {
    body: Joi.object().keys({
      firstName: Joi.string().optional(),
      lastName: Joi.string().optional(),
      phoneNumber: Joi.string().optional(),
      photo: Joi.string().optional(),
    }),
  }

  public updatePassword = {
    body: Joi.object().keys({
      newPassword: Joi.string().required(),
      confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().strict().messages({'any.only': 'Password not same'}),
    }),
  }
}

export const accountValidation = new AccountValidation();
