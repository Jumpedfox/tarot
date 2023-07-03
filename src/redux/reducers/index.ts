import { createSlice } from "@reduxjs/toolkit";
import { IState } from "./types";

const initialState: IState = {
  showLoader: false,
  musicVolume: 1,
  musicIsOn: true,
  transitionAnimationZoom: true,
  divinationCardsAmount: 0
};

const interfaceSlice = createSlice({
  name: "interfaceSlice",
  initialState,
  reducers: {
    toggleShowLoader: (state, action) => {
      state.showLoader = action.payload;
    },
    changeVolume: (state, action) => {
      state.musicVolume = action.payload;
    },
    toggleMusicIsOn: (state, action) => {
      state.musicIsOn = action.payload;
    },
    toggleTransitionAnimationZoom: (state, action) => {
      state.transitionAnimationZoom = action.payload;
    },
    setDivinationCardsAmount: (state, action) => {
      state.divinationCardsAmount = action.payload;
    }
  },
  extraReducers: {},
});

export const { toggleShowLoader, changeVolume, toggleMusicIsOn, toggleTransitionAnimationZoom, setDivinationCardsAmount } = interfaceSlice.actions;

export default interfaceSlice.reducer;
