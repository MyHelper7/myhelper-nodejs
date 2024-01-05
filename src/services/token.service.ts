import jwt from 'jsonwebtoken';
import { config } from '../config';
import { timeHelper } from '../helpers';
import { User } from '../models';
import { BadRequestError } from '../utils';
import { TOKEN_TYPE } from '../constants';

class TokenService {
  private create(payload: object | string, secret: string, { expiresIn, algorithm }) {
    return jwt.sign(payload, secret, {
      ...(expiresIn ? { expiresIn } : null),
      ...(algorithm ? { algorithm } : null),
    });
  }

  private verify(token: string, secret: string, { algorithm }) {
    return jwt.verify(token, secret, {
      ...(algorithm ? { algorithms: [algorithm] } : null)
    });
  }

  private generateToken(payload: any, type: string, secret: string, { expiresInMins = 1, algorithm = 'sha256' }) { // [Default]: expiresIn 1 minute
    const token = this.create({
      ...payload,
      type,
      iat: timeHelper.time().unix(),
    }, secret, { expiresIn: expiresInMins * 60, algorithm });

    return { token };
  }

  private verifyToken(token: string, type: string, secret: string, { algorithm = 'sha256' }) {
    const decodedToken = this.verify(token, secret, { algorithm });
    if (decodedToken?.['type'] !== type) {
      throw new BadRequestError('Type mismatch');
    }
    return decodedToken;
  }

  public generateAccessToken(user: User) {
    const { ACCESS_PRIVATE_KEY, ACCESS_EXPIRATION_MINUTES, ACCESS_ALGORITHM } = config.JWT;

    return this.generateToken({ sub: user.id }, TOKEN_TYPE.ACCESS, ACCESS_PRIVATE_KEY, {
      expiresInMins: ACCESS_EXPIRATION_MINUTES,
      algorithm: ACCESS_ALGORITHM
    });
  }

  public verifyAccessToken(token: string) {
    const { ACCESS_PUBLIC_KEY, ACCESS_ALGORITHM } = config.JWT;

    return this.verifyToken(token, TOKEN_TYPE.ACCESS, ACCESS_PUBLIC_KEY, { algorithm: ACCESS_ALGORITHM });
  }

}

export const tokenService = new TokenService();
