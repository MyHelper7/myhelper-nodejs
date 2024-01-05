import { DataTypes, Model, Optional } from 'sequelize';
import { database } from '../config';
import bcrypt from 'bcrypt';
import { ValidationError } from '../utils';
import { ROLES } from '../constants';

export interface IUser {
  id: number;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  emailVerified?: boolean;
  password?: string;
  phoneNumber?: string;
  phoneVerified?: boolean;
  photo?: string;
  role?: string;
  ssoIdentifier?: string;
  ssoId?: string;
  confirmationHash?: string | null;
  confirmationSentAt?: Date | null;
  resetPasswordHash?: string | null;
  resetPasswordSentAt?: Date | null;
  currentIp?: string;
  currentLoginAt?: Date;
  lastIp?: string;
  lastLoginAt?: Date;
  publicKey?: string | null;
  deactivatedAt?: Date;
  inviteCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface IUserInput extends Optional<IUser, 'id'> {};
export interface IUserOutput extends Required<IUser> {};

export class User extends Model<IUser, IUserInput> implements IUser {
  public id!: number;
  public firstName!: string;
  public lastName?: string;
  public fullName?: string;
  public email!: string;
  public emailVerified?: boolean;
  public password!: string;
  public phoneNumber?: string;
  public phoneVerified?: boolean;
  public photo?: string;
  public role!: string;
  public ssoIdentifier?: string;
  public ssoId?: string;
  public confirmationHash?: string | null;
  public confirmationSentAt?: Date | null;
  public resetPasswordHash?: string | null;
  public resetPasswordSentAt?: Date | null;
  public currentIp?: string;
  public currentLoginAt?: Date;
  public lastIp?: string;
  public lastLoginAt?: Date;
  public publicKey?: string | null;
  public deactivatedAt?: Date;
  public inviteCode?: string;
  public createdAt?: Date;
  public updatedAt?: Date;


  public static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  public async forgotPassword() {
    this.resetPasswordHash = await bcrypt.genSalt();
    this.resetPasswordSentAt = new Date();
    await this.save();
  }

  public async resetPassword(password) {
    this.password = await User.hashPassword(password);
    this.resetPasswordHash = null;
    this.resetPasswordSentAt = null;
    await this.save();
  }

  public async comparePassword(oldPassword: string, newPassword: string) {
    return await bcrypt.compare(oldPassword, newPassword);
  }

  public async updatePassword(newPassword: string, confirmPassword: string) {
    if (newPassword != confirmPassword) throw new ValidationError('Password not match');

    this.password = await User.hashPassword(newPassword);
    await this.save();
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: {
      name: 'email',
      msg: 'This email is already taken'
    },
    allowNull: true,
  },
  emailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phoneVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: ROLES.USER,
  },
  confirmationHash: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  confirmationSentAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  resetPasswordHash: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetPasswordSentAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  currentIp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  currentLoginAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  lastIp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastLoginAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  publicKey: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  deactivatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  inviteCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstName?.trim()} ${this.lastName?.trim()}`.trim();
    }
  }
}, {
  timestamps: true,
  sequelize: database,
  modelName: 'users',
  underscored: true,
});

export default User;