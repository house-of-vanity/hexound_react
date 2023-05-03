import { createSlice } from "@reduxjs/toolkit";
import { LocalPlayListState, LocalPlayListReducer } from "./types";

const initialState: LocalPlayListState = {
	tracks: [],
};

export const localPlayListSlice = createSlice<
	LocalPlayListState,
	LocalPlayListReducer
>({
	name: "localPlayList",
	initialState,
	reducers: {
		add: (state, { payload }) => {
			state.tracks.push(payload);
		},
		remove: (state, { payload }) => {
			state.tracks = state.tracks.filter(({ id }) => id !== payload.id);
		},
	},
});
