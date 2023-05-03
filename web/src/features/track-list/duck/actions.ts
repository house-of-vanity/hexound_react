import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApiHasItems } from "./utils";

import * as api from "../../../api";
import { TrackDictDTO, TrackDTO } from "../../../api";
import { AppDispatch, RootState } from "../../../store/store";
import { getNextTrack } from "./selectors";
import { trackDictSlice } from "./slices";
import { OnGetNextParams } from "../../shared";

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
			console.log(e);
		} finally {
		}
	}
);

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
	const { offset, limit, hasItems, dict } = state.playerData;
	const nextTrack = getNextTrack(state, params);
	if (nextTrack) {
		dispatch(actions.setCurrentTrack(nextTrack));
	} else {
		// Если есть элементы для загрузки
		if (hasItems) {
			const result: TrackDictDTO = await api.getTrackList({ limit, offset });
			const apiHasItems = getApiHasItems(limit, result);

			dispatch(actions.setDict({ ...dict, ...result }));

			if (apiHasItems) {
				dispatch(actions.setOffset(limit + offset));
			} else {
				dispatch(actions.setApiHasItems(false));
			}

			dispatch(actions.setCurrentTrack(Object.values(result)[0]));
		} else if (params.isLoop) {
			// Если бесконечный цикл
			dispatch(actions.setCurrentTrack(Object.values(dict)[0]));
		}
	}
};
