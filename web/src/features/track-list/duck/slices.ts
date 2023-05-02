import { createSlice } from "@reduxjs/toolkit";
import { TrackDictReducers, TrackDictState } from "./types";

const initialState: TrackDictState = {
	dict: {},
	loading: false,
	currentTrack: null,
	player: null,
	limit: 100,
	offset: 0,
	hasItems: true,
};

export const trackDictSlice = createSlice<TrackDictState, TrackDictReducers>({
	name: "trackList",
	initialState,
	reducers: {
		setLoading: (state, { payload }) => {
			state.loading = payload;
		},
		setDict(state, { payload }) {
			state.dict = payload;
		},
		setCurrentTrack: (state, { payload }) => {
			state.currentTrack = payload;
		},
		setLimit: (state, { payload }) => {
			state.limit = payload;
		},
		setOffset: (state, { payload }) => {
			state.offset = payload;
		},
		setApiHasItems: (state, { payload }) => {
			state.hasItems = payload;
		},
		reset: () => initialState,
	},
});
