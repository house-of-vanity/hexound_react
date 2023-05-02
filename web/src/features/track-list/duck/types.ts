import { PayloadAction } from "@reduxjs/toolkit";
import { TrackDTO, TrackDictDTO } from "../../../api";

export type PlayingNode = unknown;

export interface TrackDictState {
	dict: TrackDictDTO;
	loading: boolean;
	currentTrack: TrackDTO | null;
	player: any;
	limit: number;
	offset: number;
	hasItems: boolean;
}

export type TrackDictReducers = {
	setLoading: (state: TrackDictState, action: PayloadAction<boolean>) => void;
	setDict: (state: TrackDictState, action: PayloadAction<TrackDictDTO>) => void;
	setCurrentTrack: (
		state: TrackDictState,
		action: PayloadAction<TrackDTO>
	) => void;
	setLimit: (state: TrackDictState, action: PayloadAction<number>) => void;
	setOffset: (state: TrackDictState, action: PayloadAction<number>) => void;
	setApiHasItems: (
		state: TrackDictState,
		action: PayloadAction<boolean>
	) => void;
	reset: () => void;
};

export interface OnGetNextParams {
	isRandom: boolean;
	isLoop: boolean;
}
