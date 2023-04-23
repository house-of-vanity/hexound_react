import { createAsyncThunk } from '@reduxjs/toolkit'
import { getTrackList, TrackDictRequestDTO } from '../../../api'
import { trackDictSlice } from './slices'

const { actions: { setDict, setLoading } } = trackDictSlice


export const fetchTrackDict = createAsyncThunk('track-dict/fetch', async (params: TrackDictRequestDTO, thunkApi) => {
    const { dispatch } = thunkApi
    try {
        dispatch(setLoading(true))

        const response = await getTrackList(params)
        dispatch(setDict(response))
    } catch (e){
        alert(e)
    } finally {
        dispatch(setLoading(true))
    }
})