import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApiHasItems } from "./utils";
import { player, playTrackById } from "../../../services";

import * as api from "../../../api";
import { TrackDTO } from "../../../api";
import { AppDispatch, RootState } from "../../../store/store";
import { getNextTrack } from "./selectors";
import { trackDictSlice } from "./slices";
import { OnGetNextParams } from "./types";

const { actions } = trackDictSlice;

export const getTrackList = createAsyncThunk(
	"player/get-tracks",
	async (_, thunkApi) => {
		const { getState, dispatch } = thunkApi;
		const { limit, offset } = (getState() as RootState).playerData;
		try {
			const result = await api.getTrackList({ limit, offset });
			const apiHasItems = getApiHasItems(limit, result);

			dispatch(actions.setDict(result));

			if (apiHasItems) {
				dispatch(actions.setOffset(limit + offset));
			} else {
				dispatch(actions.setApiHasItems(false));
			}
		} catch (e) {
		} finally {
		}
	}
);

/* WARNING use redux-thunk */
export const togglePlay = (bool: boolean) => {
	return (dispatch: AppDispatch, getState: () => RootState) => {
		const state = getState();
		const currentPlayingNode = player.currentPlayingNode;
		const currentTrack = state.playerData.currentTrack;

		let trackId: number;

		if (currentTrack) {
			trackId = currentTrack.id;
		} else {
			// Случая когда пользователь не выбрал трек
			const { dict } = state.playerData;
			trackId = Number(Object.keys(dict)[0]);
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
		if (typeof result === "boolean") {
		}
		if (result instanceof Promise) {
			result
				.then((resolve) => {})
				.catch(() => {
					alert("togglePlay Трэк не был загружен");
				});
		}
	};
};

export const setCurrentTrack = (currentTrack: TrackDTO) => {
	return (dispatch: AppDispatch) => {
		dispatch(actions.setCurrentTrack(currentTrack));
	};
};

export const getSingleTrack = (trackId: number) => async (
	dispatch: AppDispatch
) => {
	try {
		const data = await api.getSingleTrack(trackId);
		dispatch(actions.setDict({ [trackId]: data }));
		dispatch(actions.setApiHasItems(false));
	} catch {}
};

export const setNextTrack = (params: OnGetNextParams) => async (
	dispatch: AppDispatch,
	getState: () => RootState
) => {
	const state = getState();
	const nextTrack = getNextTrack(state, params);
	dispatch(actions.setCurrentTrack(nextTrack as TrackDTO));
};
