import {
	GET_TRACK_LIST,
	TOGGLE_PLAY,
	CURRENT_TRACK,
	SET_CURRENT_PLAYER_EXAMPLE,
	SET_DETOUCH_STADIA,
	SET_PROGRESS_PERCENT,
	SET_OFFSET,
	SET_API_HAS_ITEM,
	TOGGLE_RANDOM,
	TOGGLE_LOOP,
} from "./defineStrings";
import fp from "lodash/fp";
import { shuffle } from "./utils";
import { player, playTrackById } from "../services";

import * as api from "../api";
import { getApiHasItems } from "../features/track-list/duck/utils";

export const getTrackList = () => (dispatch, getState) => {
	const { limit, offset } = getState().playerData;
	api.getTrackList({ limit, offset }).then((trackList) => {
		dispatch({ type: GET_TRACK_LIST, payload: trackList });

		const apiHasItems = getApiHasItems(limit, trackList);

		if (apiHasItems) {
			dispatch({ type: SET_OFFSET, payload: limit + offset });
		} else {
			dispatch({ type: SET_API_HAS_ITEM, payload: false });
		}
	});
};

/* WARNING use redux-thunk */
export const togglePlay = (bool) => {
	return (dispatch, getState) => {
		const state = getState();
		const currentPlayingNode = player.currentPlayingNode;
		const currentTrack = state.playerData.currentTrack;
		const loadFunction = playTrackById(currentTrack.id);

		let result;

		switch (currentPlayingNode) {
			case null:
				result = loadFunction();
				break;
			default:
				result = true;
				player.togglePause();
				break;
		}
		dispatch(setDetouchStadia(true));
		if (typeof result === "boolean") {
			dispatch({ type: TOGGLE_PLAY, payload: bool });
			dispatch({
				type: SET_CURRENT_PLAYER_EXAMPLE,
				payload: currentPlayingNode,
			});
			dispatch(setDetouchStadia(false));
		}
		if (result instanceof Promise) {
			result
				.then((resolve) => {
					if (resolve === true) {
						dispatch({ type: TOGGLE_PLAY, payload: bool });
						dispatch({
							type: SET_CURRENT_PLAYER_EXAMPLE,
							payload: currentPlayingNode,
						});
					}
					dispatch(setDetouchStadia(false));
				})
				.catch(() => {
					alert("togglePlay Трэк не был загружен");
					dispatch({ type: TOGGLE_PLAY, payload: false });
					dispatch(setDetouchStadia(false));
				});
		}
	};
};

export const stop = () => {
	return (dispatch) => {
		dispatch({ type: TOGGLE_PLAY, payload: false });
		dispatch({ type: SET_CURRENT_PLAYER_EXAMPLE, payload: null });
		dispatch(setPercent(0));
		player.stop();
	};
};

export const setCurrentTrack = (obj) => {
	return (dispatch, getState) => {
		const { trackList } = getState().playerData;
		const trackListKeys = Object.keys(trackList);
		const getTrackObj = (key) =>
			trackList.hasOwnProperty(key) ? trackList[key] : null;
		let newCurrentCtrack = false;

		if (obj && obj.hasOwnProperty("id")) {
			newCurrentCtrack = fp.pipe(
				fp.findIndex((id) => +id === obj.id),
				(index) => {
					return index !== undefined && index !== null
						? getTrackObj(trackListKeys[index + 1])
						: null;
				}
			)(trackListKeys);
		}

		dispatch({ type: CURRENT_TRACK, payload: obj });
		const currentTrack = obj;
		const currentPlayingNode = player.currentPlayingNode;
		const loadFunction = playTrackById(currentTrack.id);

		const result = loadFunction();
		dispatch({ type: TOGGLE_PLAY, payload: false });
		player.stop();
		dispatch(setDetouchStadia(true));
		result
			.then((resolve) => {
				if (resolve === true) {
					dispatch({ type: TOGGLE_PLAY, payload: true });
					dispatch({
						type: SET_CURRENT_PLAYER_EXAMPLE,
						payload: currentPlayingNode,
					});
				}
				dispatch(setDetouchStadia(false));
				newCurrentCtrack === null && dispatch(getTrackList(false));
			})
			.catch(() => {
				alert("setCurrentTrack Трэк не был загружен");
				dispatch({ type: TOGGLE_PLAY, payload: false });
				dispatch({ type: SET_CURRENT_PLAYER_EXAMPLE, payload: null });
				dispatch(setDetouchStadia(false));
			});
	};
};

export const setDetouchStadia = (bool) => ({
	type: SET_DETOUCH_STADIA,
	payload: bool,
});

export const setPercent = (float) => ({
	type: SET_PROGRESS_PERCENT,
	payload: float,
});

export const onEnded = () => {
	return (dispatch, getState) => {
		const { currentTrack, trackList, isRandom, isLoop } = getState().playerData;
		const trackListKeys = isRandom
			? shuffle(Object.keys(trackList))
			: Object.keys(trackList);
		const getTrackObj = (key) =>
			trackList.hasOwnProperty(key) ? trackList[key] : null;

		const newCurrentCtrack = fp.pipe(
			fp.findIndex((id) => {
				return +id === currentTrack.id;
			}),
			(index) => {
				return index !== undefined && index !== null
					? getTrackObj(trackListKeys[index + 1])
					: null;
			}
		)(trackListKeys);

		if (newCurrentCtrack) {
			dispatch(setCurrentTrack(newCurrentCtrack));
		} else {
			if (isLoop) {
				const zeroTrack = trackList[trackListKeys[0]];
				dispatch(setCurrentTrack(zeroTrack));
			} else {
				dispatch(stop());
			}
		}
	};
};

export const setPositionByPercent = (float) => {
	return (dispatch, getState) => {
		const { isPlay } = getState().playerData;
		if (isPlay) {
			player.setPositionByPercent(float);
		}
	};
};

export const toggleRandom = () => (dispatch, getState) => {
	const { isRandom } = getState().playerData;
	dispatch({ type: TOGGLE_RANDOM, payload: !isRandom });
};

export const toggleLoop = () => (dispatch, getState) => {
	const { isLoop } = getState().playerData;
	dispatch({ type: TOGGLE_LOOP, payload: !isLoop });
};

export const getSingleTrack = (trackId) => async (dispatch) => {
	try {
		const data = await api.getSingleTrack(trackId);
		dispatch({ type: GET_TRACK_LIST, payload: { [trackId]: data } });
		dispatch({ type: SET_API_HAS_ITEM, payload: false });
	} catch {}
};
