import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { playerReducers } from "./redusers";
import { setPercent, onEnded } from "./actions";
import { getPlayer } from "../services";

const defaultState = {
	playerData: {
		trackList: [],
		isPlay: false,
		currentTrack: null,
		player: getPlayer(),
		currentPlayingNode: null,
		limit: 100,
		offset: 0,
		hasItems: true,
	},
};

export const store = createStore(
	playerReducers,
	defaultState,
	applyMiddleware(reduxThunk)
);

// Add Player handlers

(function (store) {
	const player = window.__PLAYER__;

	player.handlers.push({
		eventName: "onEnded",
		handler: function (params) {
			store.dispatch(onEnded());
		},
	});
	player.addHandler("onAudioprocess", function (e) {
		const postion = window.__PLAYER__.getPosition();
		if (postion !== 0) {
			const duration = window.__PLAYER__.duration();
			const percent = parseFloat(postion) / parseFloat(duration);
			store.dispatch(setPercent(percent));
		} else {
			store.dispatch(setPercent(0));
		}
	});
})(store);
