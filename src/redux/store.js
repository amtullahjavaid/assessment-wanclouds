import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('userState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state', err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('userState', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};

const persistedState = loadState();

const store = configureStore({
  reducer: {
    users: userReducer
  },
  preloadedState: persistedState
});

store.subscribe(() => {
  saveState({
    users: store.getState().users
  });
});

export default store;