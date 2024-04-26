import CryptoJS from "crypto-js";
import { U_M } from "./constants";
export const encodePassword = (password) => {
  return CryptoJS.AES.encrypt(password, U_M).toString();
};

export const decodePassword = (password) => {
  return CryptoJS.AES.decrypt(password, U_M).toString(CryptoJS.enc.Utf8);
};

export const basicAuthentication = (username, password) => ({
  auth: { username, password },
});


export const resolveUrl = (url) => (url.endsWith("/") ? url : `${url}/`)