import { BaseSerializer } from './base';

export class LoginSerializer implements BaseSerializer {
  public authToken: string;

  constructor({ authToken }) {
    this.authToken = authToken;
  }

  serialize() {
    return { authToken: this.authToken };
  }
}