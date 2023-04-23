import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { TrackDTO } from "../api";

const getTrackList = (state: RootState) => state.playerData.trackList;

export const getArrTracks = createSelector([getTrackList], (trackObject) =>
	Object.values(trackObject)
);

export const getPlayList = createSelector([getTrackList], (trackList) =>
	Object.keys(trackList)
);

export const getCurrentTrack = (state: RootState) => state.playerData.currentTrack


export const getNextTrack = createSelector([getArrTracks, getCurrentTrack], (tracks, currentTrack): TrackDTO | null=>{
	const currentTrackIndex = tracks.findIndex(({id})=>id===currentTrack?.id) as number
	const nextTrack = tracks[currentTrackIndex + 1]
	return nextTrack || null
})