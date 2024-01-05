import { ROLES } from '../constants';
import { User } from '../models';
import { pick } from '../utils';
import { BaseSerializer } from './base';

export class AccountSerializer implements BaseSerializer {
  public user: User;

  constructor(user: User) {
    this.user = user;
  }

  serialize() {
    return {
      ...pick(this.user.dataValues, [
        'id',
        'firstName',
        'lastName',
        'email',
        'emailVerified',
        'phoneNumber',
        'phoneVerified',
        'photo',
        'currentIp',
        'lastIp',
        'inviteCode',
      ]),
      lastLoginAt: this.user.lastLoginAt?.toString() || null,
      currentLoginAt: this.user.currentLoginAt?.toString() || null,
      isAdmin: this.user.role === ROLES.ADMIN,
    };
  }
}
