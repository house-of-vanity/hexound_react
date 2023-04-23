import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";
import { TrackDTO } from "../../../api";
import { shuffle } from "./utils";

const getTrackList = (state: RootState) => state.playerData.dict;

export const getArrTracks = createSelector([getTrackList], (trackObject) =>
	Object.values(trackObject)
);

export const getPlayList = createSelector([getTrackList], (trackList) => Object.keys(trackList));

export const getCurrentTrack = (state: RootState) => state.playerData.currentTrack

export const getIsRandom = (state: RootState) => state.playerData.isRandom


export const getNextTrack = createSelector([getArrTracks, getCurrentTrack, getIsRandom], (tracks, currentTrack, isRandom): TrackDTO | null=>{
	// Учесть нужно ли рандомно переключить
	const shuffleTracks = isRandom ? shuffle(Object.values(tracks)) : tracks

	const currentTrackIndex = shuffleTracks.findIndex(({id})=>id===currentTrack?.id) as number
	const nextTrack = shuffleTracks[currentTrackIndex + 1]
	return nextTrack || null
})