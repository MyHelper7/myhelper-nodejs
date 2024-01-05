import { userDAL } from '../dal';
import { IUserInput, User } from '../models';

class AccountService {
  public async update(id: number, payload: IUserInput): Promise<User> {
    const user = await userDAL.findOne({ id });
    await user.update({
      ...(payload.firstName ? { firstName: payload.firstName } : null),
      ...(payload.lastName ? { lastName: payload.lastName } : null),
      ...(payload.phoneNumber ? { phoneNumber: payload.phoneNumber, phoneVerified: false } : null),
      ...(payload.photo ? { photo: payload.photo } : null),
      ...(payload.deactivatedAt ? { deactivatedAt: payload.deactivatedAt } : null),
    })
    return user;
  }

  public async delete(id: number): Promise<boolean> {
    await userDAL.delete(id);
    return true;
  }

  public async updatePassword(id: number, newPassword: string, confirmPassword: string): Promise<User> {
    const user = await userDAL.findOne({ id });

    await user.updatePassword(newPassword, confirmPassword);
    return user;
  }
}

export const accountService = new AccountService();
