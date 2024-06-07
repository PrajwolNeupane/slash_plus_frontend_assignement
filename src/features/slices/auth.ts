import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  _id: string | undefined;
  name: string | undefined;
  logo: string | undefined;
  email: string | undefined;
  image: string | undefined;
  phone: string | undefined;
  city: string | undefined;
  country: string | undefined;
  description: string | undefined;
  date: string | undefined;
  postalCode: string | undefined;
} | null;

const initialState: InitialState = null;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: InitialState, action: PayloadAction<InitialState>) => {
      state = action.payload;
    },

    logOut: (state) => {
      state = initialState;
    },
  },
});

export default authSlice.reducer;
export const { setUser, logOut } = authSlice.actions;
