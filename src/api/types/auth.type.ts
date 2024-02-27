export type LOGIN_TYPE = {
  email: string;
  password: string;
};

export type FORGET_PASSWORD = {
  email: string;
  otp: string;
};
export type RESET_PASSWORD = {
  password: string;
  token: string;
};
