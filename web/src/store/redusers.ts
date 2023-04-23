import { combineReducers } from "redux";
import { PayloadAction } from '@reduxjs/toolkit'
import {
	GET_TRACK_LIST,
	TOGGLE_PLAY,
	CURRENT_TRACK,
	SET_CURRENT_TRACK_BUFFER,
	SET_DETOUCH_STADIA,
	SET_PROGRESS_PERCENT,
	SET_OFFSET,
	SET_LIMIT,
	SET_API_HAS_ITEM,
	TOGGLE_RANDOM,
	TOGGLE_LOOP,
} from "./defineStrings";
import { trackDictSlice } from "../features/track-list/duck";
import { TrackDTO, TrackDictDTO } from "../api";



export interface LegacyPlayerReducer {
	trackList: TrackDictDTO
	isRandom: boolean,
	isLoop: boolean,
	isPlay: boolean,
	currentTrack: TrackDTO | null,
	player: any,
	percent: number,
	limit: number,
	offset: number,
	hasItems: boolean,
	isDeTouch: boolean
}

const defaultState: LegacyPlayerReducer = {
	trackList: {},
	isRandom: false,
	isLoop: false,
	isPlay: false,
	currentTrack: null,
	player: null,
	percent: 0,
	limit: 100,
	offset: 0,
	hasItems: true,
	isDeTouch: false
};

export const playerReducer = (state: LegacyPlayerReducer = defaultState, action: PayloadAction<any>): LegacyPlayerReducer => {
	switch (action.type) {
		case GET_TRACK_LIST:
			return { ...state, trackList: { ...state.trackList, ...action.payload } };
		case TOGGLE_PLAY:
			return { ...state, isPlay: action.payload };
		case CURRENT_TRACK:
			return { ...state, currentTrack: action.payload };
		case SET_DETOUCH_STADIA:
			return { ...state, isDeTouch: action.payload };
		case SET_PROGRESS_PERCENT:
			return { ...state, percent: action.payload };
		case SET_LIMIT:
			return { ...state, limit: action.payload };
		case SET_OFFSET:
			return { ...state, offset: action.payload };
		case SET_API_HAS_ITEM:
			return { ...state, hasItems: action.payload };
		case TOGGLE_RANDOM:
			return { ...state, isRandom: action.payload };
		case TOGGLE_LOOP:
			return { ...state, isLoop: action.payload };
		default:
			return state;
	}
};

const defaultBufferState = {};

export const bufferReducers = (state = defaultBufferState, action: PayloadAction<any>) => {
	switch (action.type) {
		case SET_CURRENT_TRACK_BUFFER:
			/* WARNING  action.payload = { name: value }*/
			const name = action.payload.name;
			const value = action.payload.value;
			const item = {};
			item[name] = value;
			return { ...state, ...item };
		default:
			return state;
	}
};

export const playerReducers = combineReducers({
	playerData: playerReducer,
	buffer: bufferReducers,
	trackDict: trackDictSlice.reducer,
});
