import {type PayloadAction, createSlice} from '@reduxjs/toolkit';

type RedirectType = {pathname: string, params: Record<string, string>} | null;

type NavigationState = {
    redirect: RedirectType
};

export const initialState: NavigationState = {
    redirect: null,
};

const navigationSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setRedirect: (state, action: PayloadAction<RedirectType>) => {
      state.redirect = action.payload;
    },
  },
});

export default navigationSlice.reducer;

export const {setRedirect} = navigationSlice.actions;
