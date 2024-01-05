import { userDAL } from '../dal';
import { IForgotPasswordPayload, ILoginPayload, IRegisterPayload, IResetPasswordPayload, ISendCodePayload, IVerifyCodePayload } from '../types';
import { RecordNotFoundError, ValidationError } from '../utils';

class AuthService {
  public async register(payload: IRegisterPayload) {
    const user = await userDAL.create({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
    });

    // Send Welcome Email
    // Send Confirmation Email

    try {
      // Giving Reward to referee
      const _referee = await userDAL.findOne({ inviteCode: payload.referenceCode });
    } catch(_) { /* empty */ }

    return user;
  }

  public async login(payload: ILoginPayload) {
    const user = await userDAL.findByPassword(payload.email, payload.password);

    await user.update({
      currentIp: payload.clientIP,
      currentLoginAt: new Date(),
      lastIp: user.currentIp,
      lastLoginAt: user.currentLoginAt,
    });

    return user;
  }

  public async forgotPassword(payload: IForgotPasswordPayload) {
    const user = await userDAL.findOne({ email: payload.email });

    await user.forgotPassword();

    // Send Forgor Password Email

    return user;
  }

  public async resetPassword(payload: IResetPasswordPayload) {
    if (payload.newPassword != payload.confirmPassword) {
      throw new ValidationError('Password not same');
    }
    let user;
    try {
      user = await userDAL.findOne({ resetPasswordHash: payload.resetId });
    } catch(error) {
      throw new RecordNotFoundError('Invalid Reset Link');
    }

    await user.resetPassword(payload.newPassword);

    return user;
  }
}

export const authService = new AuthService();
