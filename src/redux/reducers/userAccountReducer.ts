import { USERNAME_PASSWORD } from "../action/types";

const initialState = {
  username: null,
  password: null,
};

const userAccount = (state = initialState, action:any) => {
  switch (action.type) {
    case USERNAME_PASSWORD:
      return {
        ...state,
        username: action.username,
        password: action.password,
      };

    default:
      return state;
  }
};

export default userAccount;
