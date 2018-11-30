import { LoginModel } from './models/loginModel';

export const API_URL = 'http://lightest.tk/api';
export const DEFAULT_USER = new LoginModel();
DEFAULT_USER.email = 'test@mail.com';
DEFAULT_USER.password = 'Password12$';
DEFAULT_USER.rememberMe = false;
