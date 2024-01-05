import { IRequest, IResponse } from '../types';
import { pick, successResponse } from '../utils';
import { AccountSerializer } from '../serializers';
import { accountService } from '../services';


class AccountController {
  public getDetail = async (req: IRequest, res: IResponse) => {
    const data = new AccountSerializer(req.user!).serialize();
    return successResponse(req, res, data);
  };

  public updateAccount = async (req: IRequest, res: IResponse) => {
    const payload = pick(req.body, ['firstName', 'lastName', 'phoneNumber', 'photo']);

    const result = await accountService.update(req.user!.id, payload);

    const data = new AccountSerializer(result).serialize();
    return successResponse(req, res, data);
  };

  public updatePassword = async (req: IRequest, res: IResponse) => {
    const { newPassword, confirmPassword } = pick(req.body, ['newPassword', 'confirmPassword']);

    await accountService.updatePassword(req.user!.id, newPassword, confirmPassword);

    return successResponse(req, res, { status: true });
  };

  public deactivateAccount = async (req: IRequest, res: IResponse) => {
    await accountService.update(req.user!.id, { deactivatedAt: new Date()});
    return successResponse(req, res, { status: true });
  };

  public deleteAccount = async (req: IRequest, res: IResponse) => {
    await accountService.delete(req.user!.id);
    return successResponse(req, res, { status: true });
  };
}

export const accountController = new AccountController();
