import { LoginModel } from './models/loginModel';

export const API_URL = 'http://35.229.22.26/api';
export const DEFAULT_USER = new LoginModel();
DEFAULT_USER.email = 'test@mail.com';
DEFAULT_USER.password = 'Password12@';
DEFAULT_USER.rememberMe = false;
