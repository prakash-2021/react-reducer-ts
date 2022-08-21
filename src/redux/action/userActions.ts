import { USERNAME_PASSWORD } from "./types";

export const loginUP = (username:string, password:string) => {
    return { type: USERNAME_PASSWORD, username: username, password: password };
  }