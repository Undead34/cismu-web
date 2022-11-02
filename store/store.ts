import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { PlayerSlice, PlaylistSlice } from "./slice";

const makeStore = () =>
  configureStore({
    reducer: {
      state_playlist: PlaylistSlice,
      state_player: PlayerSlice,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);

// Infer the `RootState` types from the store itself
export type RootState = ReturnType<typeof makeStore>;
