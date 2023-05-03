import { combineReducers } from "redux";
import { trackDictSlice } from "../features/track-list/duck";
import { localPlayListSlice } from "../features/local-play-list/duck";

export const rootReducer = combineReducers({
	playerData: trackDictSlice.reducer,
	localPlayList: localPlayListSlice.reducer,
});
