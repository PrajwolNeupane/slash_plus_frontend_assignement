import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  _id: string | null;
  email: string | null;
  photo: string | null;
};

const initialState: InitialState = {
  _id: null,
  email: null,
  photo: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: InitialState, action: PayloadAction<InitialState>) => {
      (state._id = action.payload._id),
        (state.email = action.payload.email),
        (state.photo = action.payload.photo);
    },

    logOut: (state) => {
      (state._id = null), (state.email = null), (state.photo = null);
    },
  },
});

export default authSlice.reducer;
export const { setUser, logOut } = authSlice.actions;
