import {type PayloadAction, createSlice} from '@reduxjs/toolkit';

type AuthState = {
    loggedIn: boolean;
};

export const initialState: AuthState = {
    loggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
  },
});

export default authSlice.reducer;

export const {setAuth} = authSlice.actions;
