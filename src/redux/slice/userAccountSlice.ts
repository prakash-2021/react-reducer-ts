import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
};

const userAccountSlice = createSlice({
  name: "userAccountSlice",
  initialState,
  reducers: {
    userAccout: (
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
  },
});

export default userAccountSlice.reducer;
export const { userAccout } = userAccountSlice.actions;
