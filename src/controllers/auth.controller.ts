import { IRequest, IResponse } from '../types';
import { pick, successResponse } from '../utils';
import { HTTP_STATUS } from '../constants';
import { authService, tokenService } from '../services';
import { LoginSerializer } from '../serializers';

class AuthController {
  public register = async (req: IRequest, res: IResponse) => {
    const payload = pick(req.body, ['firstName', 'lastName', 'email', 'password', 'referenceCode']);

    await authService.register(payload);

    return successResponse(req, res, { status: true }, { statusCode: HTTP_STATUS.CREATED});
  };

  public login = async (req: IRequest, res: IResponse) => {
    const payload = pick(req.body, ['email', 'password']);

    const user = await authService.login({ ...payload, clientIP: req.clientIP });

    const authToken = tokenService.generateAccessToken(user);

    const data = new LoginSerializer({ authToken: authToken.token }).serialize();

    return successResponse(req, res, data);
  };

  public forgotPassword = async (req: IRequest, res: IResponse) => {
    const payload = pick(req.body, ['email']);

    await authService.forgotPassword(payload);

    return successResponse(req, res, { status: true });
  };

  public resetPassword = async (req: IRequest, res: IResponse) => {
    const payload = pick(req.body, ['resetId', 'newPassword', 'confirmPassword']);

    await authService.resetPassword(payload);

    return successResponse(req, res, { status: true });
  };
}

export const authController = new AuthController();
