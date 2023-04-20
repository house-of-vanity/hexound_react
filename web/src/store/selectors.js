import { createSelector } from "@reduxjs/toolkit";

const getTrackList = (state) => state.playerData.trackList;

export const getArrTracks = createSelector([getTrackList], (trackObject) =>
	Object.values(trackObject)
);

export const getPlayList = createSelector([getTrackList], (trackList) =>
	Object.keys(trackList)
);
