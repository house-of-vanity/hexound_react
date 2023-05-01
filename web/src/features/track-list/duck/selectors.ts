import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";
import { TrackDTO } from "../../../api";
import { shuffle } from "./utils";
import { OnGetNextParams } from "./types";

const getTrackList = (state: RootState) => state.playerData.dict;

export const getArrTracks = createSelector([getTrackList], (trackObject) =>
	Object.values(trackObject)
);

export const getPlayList = createSelector([getTrackList], (trackList) =>
	Object.keys(trackList)
);

export const getCurrentTrack = (state: RootState) =>
	state.playerData.currentTrack;

export const getIsRandom = (state: RootState, params: OnGetNextParams) =>
	params;

export const getNextTrack = createSelector(
	[getArrTracks, getCurrentTrack, getIsRandom],
	(tracks, currentTrack, params): TrackDTO | null => {
		const { isRandom, isLoop } = params;
		// Учесть нужно ли рандомно переключить
		const shuffleTracks = isRandom ? shuffle(Object.values(tracks)) : tracks;

		const currentTrackIndex = shuffleTracks.findIndex(
			({ id }) => id === currentTrack?.id
		);
		const nextTrack = shuffleTracks[currentTrackIndex + 1];

		if (!nextTrack && isLoop) {
			return shuffleTracks[0];
		}

		return nextTrack || null;
	}
);
