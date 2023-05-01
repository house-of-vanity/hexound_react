import { createSlice } from '@reduxjs/toolkit'
import { TrackDictReducers, TrackDictState } from './types'

const initialState: TrackDictState = {
    dict: {},
    loading: false,
    isRandom: false,
	isLoop: false,
	isPlay: false,
	currentTrack: null,
	player: null,
	currentPlayingNode: null,
	limit: 100,
	offset: 0,
	hasItems: true,
	isDeTouch: false
}

export const trackDictSlice = createSlice<TrackDictState, TrackDictReducers>({
    name: 'trackList',
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.loading = payload
        },
        setDict(state, { payload }) {
            state.dict = payload
        },
        seIsPlay: (state, {payload}) => {
            state.isPlay = payload
        },
        setCurrentPlayerNode: (state, { payload }) => {
            state.currentPlayingNode = payload
        },
        setCurrentTrack: ( state, {payload} ) => {
            state.currentTrack = payload
        } ,
        setDetouch: (state, { payload }) => {
            state.isDeTouch = payload
        },
        setLimit:  (state, { payload }) => {
            state.limit = payload
        },
        setOffset:  (state, { payload }) => {
            state.offset = payload
        },
        setApiHasItems: (state, { payload }) => {
            state.hasItems = payload
        },
        setRandom: (state, { payload }) => {
            state.isRandom = payload
        },
        setIsLoop: (state, { payload }) => {
            state.isLoop = payload
        },
    }
})



