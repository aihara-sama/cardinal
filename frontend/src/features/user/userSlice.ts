import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  userDetails: {
    id: number;
    email: string;
    avatar: string;
  } | null;
};

const initialState: InitialState = {
  userDetails: null,
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setUser: (state, action: PayloadAction<InitialState['userDetails']>) => {
      state.userDetails = action.payload;
    },
    removeUser: (state) => {
      state.userDetails = null;
    },
  },
});
export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
