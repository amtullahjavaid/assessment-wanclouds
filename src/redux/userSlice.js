import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    userList: []
  },
  reducers: {
    addUser: (state, action) => {
      const newUser = {
        id: Date.now(),
        ...action.payload
      };
      state.userList.push(newUser);
    },
    deleteUser: (state, action) => {
      state.userList = state.userList.filter(user => user.id !== action.payload);
    }
  }
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;