import { createSelector } from 'reselect'
// import { fp } from 'lodash' 

const getTrackList = state => state.playerData.trackList

export const getArrTracks = createSelector(
    [getTrackList],
    (trackObject) => Object.values(trackObject)
)

export const getPlayList = createSelector(
    [getTrackList],
    (trackList) => Object.keys(trackList)
)