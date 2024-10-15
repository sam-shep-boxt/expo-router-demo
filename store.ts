import {  configureStore } from '@reduxjs/toolkit'
import authSlice from './api/auth/authSlice'
import navigationSlice from './api/navigation/navigationSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  nav: navigationSlice,
  auth:authSlice
});


export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;