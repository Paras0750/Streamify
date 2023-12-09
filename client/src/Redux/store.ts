import { configureStore } from "@reduxjs/toolkit";
import channelSlice from "./slices/channelSlice";

export const store = configureStore({
  reducer: {
    channel: channelSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
