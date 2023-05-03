import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";
import { TrackDTO } from "../../../api";

export const localPlayListSelector = (state: RootState) =>
	state.localPlayList.tracks;

const trackIdSelector = (state: RootState, track: TrackDTO) => track.id;

export const trackInPlayListSelector = createSelector(
	[localPlayListSelector, trackIdSelector],
	(tracks, trackID): boolean => {
		return Boolean(tracks.find(({ id }) => id === trackID));
	}
);
