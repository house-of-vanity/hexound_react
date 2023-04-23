import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { TrackDictDTO } from '../../../api'

export interface TrackDictState {
    dict: TrackDictDTO,
    loading: boolean
}

export type TrackDictReducers = {
    setLoading: (state: TrackDictState, action: PayloadAction<boolean>) => void;
    setDict: (state: TrackDictState, action: PayloadAction<TrackDictDTO>) => void
}

const initialState: TrackDictState = {
    dict: {},
    loading: false
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
    }
})


