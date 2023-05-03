import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";
import { TrackDTO } from "../../../api";
import { OnGetNextParams } from "../../shared";
import { getNextTrackUtil } from "../../shared";

const getTrackList = (state: RootState) => state.playerData.dict;

export const getArrTracks = createSelector([getTrackList], (trackObject) =>
	Object.values(trackObject)
);

export const getPlayList = createSelector([getTrackList], (trackList) =>
	Object.values(trackList)
);

export const getCurrentTrack = (state: RootState) =>
	state.playerData.currentTrack;

export const getIsRandom = (state: RootState, params: OnGetNextParams) =>
	params;

export const getNextTrack = createSelector(
	[getArrTracks, getCurrentTrack, getIsRandom],
	(tracks, currentTrack, params): TrackDTO | null =>
		getNextTrackUtil(tracks, currentTrack, params)
);
