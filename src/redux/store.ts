import { configureStore } from "@reduxjs/toolkit";
import ProjectReducer from './Projects/ProjectSlice'
import UserReducer from './Projects/UserSlice'
export const store = configureStore({
  reducer: {
    projects: ProjectReducer,
    user:UserReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;