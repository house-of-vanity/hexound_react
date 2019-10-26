
import { combineReducers } from "redux"; 
import { GET_TRACK_LIST,  TOGGLE_PLAY, CURRENT_TRACK } from './defineStrings';
const defaultState = {
    trackList: [],
    isPlay: false,
    currentTrack: null
}

export const playerReduser = ( state = defaultState, action ) => {
    switch( action.type ){
        case GET_TRACK_LIST:
            return { ...state, trackList: action.payload }
        case TOGGLE_PLAY:
            return { ...state, isPlay: action.payload }
        case CURRENT_TRACK: 
            return { ...state, currentTrack: action.payload }
        default: return state;
    }
}


export const palayerRedusers = combineReducers({
    playerData: playerReduser
});