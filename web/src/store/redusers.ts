import { combineReducers } from "redux";
import { PayloadAction } from '@reduxjs/toolkit'
import {
	SET_CURRENT_TRACK_BUFFER,
} from "./defineStrings";
import { trackDictSlice } from "../features/track-list/duck";

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
	playerData: trackDictSlice.reducer,
	buffer: bufferReducers,
});
