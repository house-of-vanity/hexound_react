import { GET_TRACK_LIST,  TOGGLE_PLAY, CURRENT_TRACK } from './defineStrings';

export const getTrackList = (array) => ({
    type: GET_TRACK_LIST,
    payload: array
});
export const togglePlay = (bool) => ({
    type: TOGGLE_PLAY,
    payload: bool
});
export const setCurrentTrack = (obj) => ({
    type: CURRENT_TRACK,
    payload: obj
});