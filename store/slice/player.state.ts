import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  currentTime: number;
  duration: number;
  paused: boolean;
  source: string | null;
  autoplay: boolean;
  playing: boolean;
  playable: boolean;
  volume: number;
}

// Define the initial state using that type
const initialState: PlayerState = {
  currentTime: 0,
  duration: 0,
  paused: true,
  source: null,
  autoplay: false,
  playing: false,
  playable: false,
  volume: 1,
};

export const PlayerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    storeReset: (state) => {
      state.currentTime = 0;
      state.duration = 0;
      state.paused = true;
      state.source = null;
      state.autoplay = false;
      state.playing = false;
      state.playable = false;
      state.volume = 1;
    },
  },
});

export const { setCurrentTime, setDuration, setVolume, storeReset } = PlayerSlice.actions;
export default PlayerSlice.reducer;
