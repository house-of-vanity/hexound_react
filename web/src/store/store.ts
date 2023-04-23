import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { playerReducers } from "./redusers";
import { onEnded } from "../features/track-list/duck/actions";
import { trackDictSlice } from '../features/track-list/duck'
import { player } from '../services'



export const store = createStore(
	playerReducers,
	applyMiddleware(reduxThunk)
);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Add Player handlers

(function (store) {
	player.handlers.push({
		eventName: "onEnded",
		handler: function (params: any) {
			// @ts-ignore
			store.dispatch(onEnded());
		},
	});
	player.addHandler("onAudioprocess", function (e: any) {
		const postion = window.__PLAYER__.getPosition();
		if (postion !== 0) {
			const duration = window.__PLAYER__.duration();
			const percent = parseFloat(postion) / parseFloat(duration);
			store.dispatch(trackDictSlice.actions.setPercent(percent));
		} else {
			store.dispatch(trackDictSlice.actions.setPercent(0));
		}
	});
})(store);
