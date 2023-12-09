import { createSlice } from "@reduxjs/toolkit";

const channelSlice = createSlice({
  name: "channelDetail",
  initialState: {
    channel: null,
  },
  reducers: {
    loginChannel: (state, action) => {
      state.channel = action.payload;
    },
    logoutChannel: (state) => {
      state.channel = null;
    },
  },
});

export const { loginChannel, logoutChannel } = channelSlice.actions;
export const selectChannel = (state: any) => state.channel.channel;
export default channelSlice.reducer;
