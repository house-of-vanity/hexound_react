import { createSelector } from 'reselect'

const getTrackList = state => state.playerData.trackList

export const getArrTracks = createSelector(
    [getTrackList],
    (trackObject) => Object.values(trackObject)
)