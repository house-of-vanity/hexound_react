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
	playingTrackId: TrackDTO['id'] | null,
	player: any,
	currentPlayingNode: PlayingNode, // TODO replace in service
	percent: number,
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
    setPlayingTrackId: (state: TrackDictState, action: PayloadAction<TrackDTO['id']>) => void 
    setDetouch: (state: TrackDictState, action: PayloadAction<boolean>)=> void
    setPercent: (state: TrackDictState, action: PayloadAction<number>) => void
    setLimit: (state: TrackDictState, action: PayloadAction<number>) => void
    setOffset: (state: TrackDictState, action: PayloadAction<number>) => void
    setApiHasItems:  (state: TrackDictState, action: PayloadAction<boolean>) => void
    setRandom: (state: TrackDictState, action: PayloadAction<boolean>) => void
    setIsLoop: (state: TrackDictState, action: PayloadAction<boolean>) => void
}


// GET_TRACK_LIST -> fetchTrackDict
// TOGGLE_PLAY -> seIsPlay
// SET_CURRENT_PLAYER_EXAMPLE -> setCurrentPlayerNode
// CURRENT_TRACK ( currentTrack -> playingTrackId ) -> setPlayingTrackId
// SET_DETOUCH_STADIA -> setDetouch
// SET_PROGRESS_PERCENT -> setPercent
// SET_LIMIT -> setLimit
// SET_OFFSET -> setOffset
// SET_API_HAS_ITEM -> setApiHasItems
// TOGGLE_RANDOM -> setRandom
// TOGGLE_LOOP -> setIsLoop 



