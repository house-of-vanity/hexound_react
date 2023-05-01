import { PayloadAction } from "@reduxjs/toolkit"
import { TrackDTO, TrackDictDTO } from "../../../api"

export type PlayingNode = unknown

export interface TrackDictState {
    dict: TrackDictDTO,
    loading: boolean
    // TODO
    isRandom: boolean,
	isLoop: boolean,
	isPlay: boolean,
	currentTrack: TrackDTO | null,
	player: any,
	currentPlayingNode: PlayingNode, // TODO replace in service
	limit: number,
	offset: number,
	hasItems: boolean,
	isDeTouch: boolean
}

export type TrackDictReducers = {
    setLoading: (state: TrackDictState, action: PayloadAction<boolean>) => void;
    setDict: (state: TrackDictState, action: PayloadAction<TrackDictDTO>) => void
    seIsPlay: (state: TrackDictState, action: PayloadAction<boolean>) => void 
    setCurrentPlayerNode: (state: TrackDictState, action: PayloadAction<PlayingNode>) => void 
    setCurrentTrack: (state: TrackDictState, action: PayloadAction<TrackDTO>) => void 
    setDetouch: (state: TrackDictState, action: PayloadAction<boolean>)=> void
    setLimit: (state: TrackDictState, action: PayloadAction<number>) => void
    setOffset: (state: TrackDictState, action: PayloadAction<number>) => void
    setApiHasItems:  (state: TrackDictState, action: PayloadAction<boolean>) => void
    setRandom: (state: TrackDictState, action: PayloadAction<boolean>) => void
    setIsLoop: (state: TrackDictState, action: PayloadAction<boolean>) => void
}


