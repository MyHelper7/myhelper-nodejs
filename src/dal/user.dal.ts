import { appHelper } from '../helpers';
import { errorHandler } from '../middlewares';
import { User, IUserInput } from '../models';
import { BadRequestError, DatabaseError, RecordNotFoundError } from '../utils';

class UserDAL {
  get instance() {
    return User;
  }

  public async create(payload: IUserInput): Promise<User> {
    try {
      const password = await User.hashPassword(payload.password);
      const inviteCode = appHelper.genreateHash(5);
      const user = await User.create({...payload, password, inviteCode});
      return user;
    } catch (error: any) {
      const errorObj = errorHandler.handleDBError(error);
      throw new errorObj.errorClass(errorObj.message || 'User not created', error);
    }
  }

  public async findByPassword(email: string, password: string): Promise<User> {
    let user;
    try {
      user = await this.findOne({ email, resetPasswordHash: null, resetPasswordSentAt: null });
      const isSame = await user.comparePassword(password, user.password);
      if (!isSame) throw new BadRequestError('Password not match');
    } catch (error) {
      throw new BadRequestError('Invalid Email or Password');
    }

    return user;
  }

  public async findOne(where): Promise<User> {
    const user = await User.findOne({ where });
    if (!user) throw new RecordNotFoundError('User not found');
    return user;
  }

  public async delete(id: number): Promise<boolean> {
    const user = await this.findOne({ id });
    await user.destroy();
    return true;
  }
}

export const userDAL = new UserDAL();
