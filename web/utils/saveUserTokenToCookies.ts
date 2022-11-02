import { Cookies } from "../model/Cookies";

export const saveUserTokenToCookies = (token: string) => {
  document.cookie = `${Cookies.UserToken}=${token}; path=/; expires=${new Date(
    new Date().getTime() + 60 * 60 * 1000 * 24 * 365.25 * 10 // about 10 years from now, give or take a few days
  ).toUTCString()}`;
};
