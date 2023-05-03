import { PayloadAction } from "@reduxjs/toolkit";
import { TrackDTO } from "../../../api";

export interface LocalPlayListState {
	tracks: TrackDTO[];
}

export type LocalPlayListReducer = {
	add: (state: LocalPlayListState, action: PayloadAction<TrackDTO>) => void;
	remove: (state: LocalPlayListState, action: PayloadAction<TrackDTO>) => void;
};
