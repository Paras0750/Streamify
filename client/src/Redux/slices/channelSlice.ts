import { createSlice } from "@reduxjs/toolkit";
export interface ChannelDetails {
  banner: string;
  bio: string;
  displayPic: string;
  username: string;
  loggedIn: boolean;
}

export interface ChannelState {
  channel: ChannelDetails;
}

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
// export const selectChannel = (state: ChannelState) => state.channel.channel;
export default channelSlice.reducer;
