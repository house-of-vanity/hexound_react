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
import { shuffle } from "./utils";
import { player, playTrackById } from "../services";

import * as api from "../api";
import { TrackDTO } from '../api'
import { getApiHasItems } from "../features/track-list/duck/utils";
import { AppDispatch, RootState } from "./store";
import { getNextTrack } from "./selectors";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTrackList = createAsyncThunk('player/get-tracks', async (_, thunkApi)=>{
	const { getState, dispatch } = thunkApi
	const { limit, offset } = (getState() as RootState).playerData
	try {
		const result = await api.getTrackList({limit, offset})
		const apiHasItems = getApiHasItems(limit, result);

		dispatch({ type: GET_TRACK_LIST, payload: result });

		if(apiHasItems){
			dispatch({ type: SET_OFFSET, payload: limit + offset });
		} else {
			dispatch({ type: SET_API_HAS_ITEM, payload: false });
		}

	} catch(e){} finally{}
})


/* WARNING use redux-thunk */
export const togglePlay = (bool: boolean) => {
	return (dispatch: AppDispatch, getState: ()=> RootState) => {
		const state = getState();
		const currentPlayingNode = player.currentPlayingNode;
		const currentTrack = state.playerData.currentTrack;

		let trackId: number

		if(currentTrack){
			trackId = currentTrack.id
		} else {
			// Случая когда пользователь не выбрал трек
			const { trackList } = state.playerData
			trackId = Number(Object.keys(trackList)[0])
		}

		const loadFunction = playTrackById(trackId);

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
	return (dispatch: AppDispatch) => {
		dispatch({ type: TOGGLE_PLAY, payload: false });
		dispatch({ type: SET_CURRENT_PLAYER_EXAMPLE, payload: null });
		dispatch(setPercent(0));
		player.stop();
	};
};

export const setCurrentTrack = (obj: TrackDTO) => {
	return (dispatch: AppDispatch, getState: ()=> RootState) => {
		const state = getState()
		const nextTrack = getNextTrack(state)

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
				// @ts-ignore
				nextTrack === null && dispatch(getTrackList(false));
			})
			.catch(() => {
				alert("setCurrentTrack Трэк не был загружен");
				dispatch({ type: TOGGLE_PLAY, payload: false });
				dispatch({ type: SET_CURRENT_PLAYER_EXAMPLE, payload: null });
				dispatch(setDetouchStadia(false));
			});
	};
};

export const setDetouchStadia = (bool: boolean) => ({
	type: SET_DETOUCH_STADIA,
	payload: bool,
});

export const setPercent = (float: number) => ({
	type: SET_PROGRESS_PERCENT,
	payload: float,
});

export const onEnded = () => {
	return (dispatch: AppDispatch, getState: ()=> RootState) => {
		const state = getState();
		const {trackList, isRandom, isLoop } = state.playerData


		const trackListKeys = isRandom
			? shuffle(Object.keys(trackList))
			: Object.keys(trackList);

		const nextTrack = getNextTrack(state)

		if (nextTrack) {
			// @ts-ignore
			dispatch(setCurrentTrack(nextTrack));
		} else {
			if (isLoop) {
				const zeroTrack = trackList[trackListKeys[0]];
				// @ts-ignore
				dispatch(setCurrentTrack(zeroTrack));
			} else {
				// @ts-ignore
				dispatch(stop());
			}
		}
	};
};

export const setPositionByPercent = (float: number) => {
	return (dispatch: AppDispatch, getState: ()=> RootState) => {
		const { isPlay } = getState().playerData;
		if (isPlay) {
			player.setPositionByPercent(float);
		}
	};
};

export const toggleRandom = () => (dispatch: AppDispatch, getState: ()=> RootState) => {
	const { isRandom } = getState().playerData;
	dispatch({ type: TOGGLE_RANDOM, payload: !isRandom });
};

export const toggleLoop = () => (dispatch: AppDispatch, getState: ()=> RootState) => {
	const { isLoop } = getState().playerData;
	dispatch({ type: TOGGLE_LOOP, payload: !isLoop });
};

export const getSingleTrack = (trackId: number) => async (dispatch: AppDispatch) => {
	try {
		const data = await api.getSingleTrack(trackId);
		dispatch({ type: GET_TRACK_LIST, payload: { [trackId]: data } });
		dispatch({ type: SET_API_HAS_ITEM, payload: false });
	} catch {}
};
