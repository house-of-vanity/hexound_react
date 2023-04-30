import { combineReducers } from "redux";
import { trackDictSlice } from "../features/track-list/duck";

export const playerReducers = combineReducers({
	playerData: trackDictSlice.reducer,
});

