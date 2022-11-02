import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface Music {
  id: number;
  title: string;
  artist: string;
  path: string;
  image?: string;
}

interface PlaylistState {
  current: number;
  has_prev: boolean;
  has_next: boolean;
  select: Music | null;
  items: Array<Music>;
  items_backup: Array<Music>;
  auto_preparse: boolean;
  repeat: boolean;
  order: object;
}

// Define the initial state using that type
const initialState: PlaylistState = {
  current: -1,
  has_prev: false,
  has_next: false,
  select: null,
  items: [],
  items_backup: [],
  auto_preparse: false,
  repeat: false,
  order: {},
};

export const PlaylistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Array<Music>>) => {
      state.items = action.payload;
    },
    setItemsBackup: (state, action: PayloadAction<Array<Music>>) => {
      state.items_backup = action.payload;
    },
    setSelect: (state, action: PayloadAction<Music | null>) => {
      state.select = action.payload;
    },
    incrementCurrent: (state) => {
      state.current += 1;
    },
    decrementCurrent: (state) => {
      state.current += -1;
    },
    setCurrent: (state, action: PayloadAction<number>) => {
      state.current = action.payload;
    },
    setHasPrev: (state, action: PayloadAction<boolean>) => {
      state.has_prev = action.payload;
    },
    setHasNext: (state, action: PayloadAction<boolean>) => {
      state.has_next = action.payload;
    },
    storeReset: (state) => {
      state.current = -1;
      state.has_prev = false;
      state.has_next = false;
      state.select = null;
      state.items = [];
      state.items_backup = [];
      state.auto_preparse = false;
      state.repeat = false;
      state.order = {};
    },
    removeItem: (state) => {
      state.items.pop();
    },
  },
});

export const {
  setItems,
  setItemsBackup,
  setSelect,
  incrementCurrent,
  decrementCurrent,
  setCurrent,
  setHasPrev,
  setHasNext,
  storeReset,
  removeItem,
} = PlaylistSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrent = (state: RootState) => state.state_playlist;

export default PlaylistSlice.reducer;
