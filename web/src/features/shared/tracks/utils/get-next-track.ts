import { TrackDTO } from "../../../../api";
import { OnGetNextParams } from "../types";
import { shuffle } from "./suffle";

export const getNextTrackUtil = (
	arrTracks: TrackDTO[],
	currentTrack: TrackDTO | null,
	params: OnGetNextParams
): TrackDTO | null => {
	const { isRandom, isLoop } = params;
	// Учесть нужно ли рандомно переключить
	const shuffleTracks = isRandom
		? shuffle(Object.values(arrTracks))
		: arrTracks;

	const currentTrackIndex = shuffleTracks.findIndex(
		({ id }) => id === currentTrack?.id
	);
	const nextTrack = shuffleTracks[currentTrackIndex + 1];

	if (!nextTrack && isLoop) {
		return shuffleTracks[0];
	}

	return nextTrack || null;
};
