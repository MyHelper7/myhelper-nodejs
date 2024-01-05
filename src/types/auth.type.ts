export interface IRegisterPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  referenceCode?: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
  clientIP: string;
}

export interface IForgotPasswordPayload {
  email: string;
}

export interface IResetPasswordPayload {
  resetId: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ISendCodePayload {
  method: 'email' | 'phone';
  identifier: string;
}

export interface IVerifyCodePayload {
  method: 'email' | 'phone';
  identifier: string;
  code: string;
}
