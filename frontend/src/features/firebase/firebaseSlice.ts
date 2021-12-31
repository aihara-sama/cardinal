import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../constants';
type InitialState = {
  firebaseApp: any;
};
const initialState: InitialState = {
  firebaseApp: initializeApp(firebaseConfig),
};

export const userSlice = createSlice({
  initialState,
  name: 'firebase',
  reducers: {},
});
export default userSlice.reducer;
