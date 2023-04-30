import { createAsyncThunk } from "@reduxjs/toolkit";
import { shuffle, getApiHasItems } from "./utils";
import { player, playTrackById } from "../../../services";

import * as api from "../../../api";
import { TrackDTO } from '../../../api'
import { AppDispatch, RootState } from "../../../store/store";
import { getNextTrack } from "./selectors";
import { trackDictSlice } from './slices'

const { actions } = trackDictSlice

export const getTrackList = createAsyncThunk('player/get-tracks', async (_, thunkApi)=>{
	const { getState, dispatch } = thunkApi
	const { limit, offset } = (getState() as RootState).playerData
	try {
		const result = await api.getTrackList({limit, offset})
		const apiHasItems = getApiHasItems(limit, result);

		dispatch(actions.setDict(result))


		if(apiHasItems){
			dispatch(actions.setOffset(limit + offset))
		} else {
			dispatch(actions.setApiHasItems(false))
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
			const { dict } = state.playerData
			trackId = Number(Object.keys(dict)[0])
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
		dispatch(actions.setDetouch(true));
		if (typeof result === "boolean") {
			dispatch(actions.seIsPlay(bool))

			dispatch(actions.setDetouch(false));

		}
		if (result instanceof Promise) {
			result
				.then((resolve) => {
					if (resolve === true) {
						dispatch(actions.seIsPlay(bool))
					}
					dispatch(actions.setDetouch(false));

				})
				.catch(() => {
					alert("togglePlay Трэк не был загружен");
					dispatch(actions.seIsPlay(false))
					dispatch(actions.setDetouch(false));
				});
		}
	};
};

export const stop = () => {
	return (dispatch: AppDispatch) => {
		dispatch(actions.seIsPlay(false))
		dispatch(actions.setPercent(0));
		player.stop();
	};
};

export const setCurrentTrack = (currentTrack: TrackDTO) => {
	return (dispatch: AppDispatch, getState: ()=> RootState) => {
		const state = getState()
		const nextTrack = getNextTrack(state)
		dispatch(actions.setCurrentTrack(currentTrack))
		const loadFunction = playTrackById(currentTrack.id);

		const result = loadFunction();

		dispatch(actions.seIsPlay(false))
		player.stop();

		dispatch(actions.setDetouch(true));

		result
			.then((resolve) => {
				if (resolve === true) {
		dispatch(actions.seIsPlay(true))


				}
				dispatch(actions.setDetouch(false));
				// @ts-ignore
				nextTrack === null && dispatch(getTrackList(false));
			})
			.catch(() => {
				alert("setCurrentTrack Трэк не был загружен");
				dispatch(actions.seIsPlay(false))
				dispatch(actions.setDetouch(false));
			});
	};
};




export const onEnded = () => {
	return (dispatch: AppDispatch, getState: ()=> RootState) => {
		const state = getState();
		const {dict, isRandom, isLoop } = state.playerData


		const trackListKeys = isRandom
			? shuffle(Object.keys(dict))
			: Object.keys(dict);

		const nextTrack = getNextTrack(state)

		if (nextTrack) {
			// @ts-ignore
			dispatch(setCurrentTrack(nextTrack));
		} else {
			if (isLoop) {
				const zeroTrack = dict[trackListKeys[0]];
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
	dispatch(actions.setRandom(!isRandom))
};

export const toggleLoop = () => (dispatch: AppDispatch, getState: ()=> RootState) => {
	const { isLoop } = getState().playerData;
	dispatch(actions.setIsLoop(!isLoop))
};

export const getSingleTrack = (trackId: number) => async (dispatch: AppDispatch) => {
	try {
		const data = await api.getSingleTrack(trackId);
		dispatch(actions.setDict( { [trackId]: data }))
		dispatch(actions.setApiHasItems(false))


	} catch {}
};
