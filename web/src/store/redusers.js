
import { combineReducers } from "redux"; 
import { 
    GET_TRACK_LIST,  
    TOGGLE_PLAY, CURRENT_TRACK, 
    SET_CURRENT_PLAYER_EXAMPLE, 
    SET_CURRENT_TRACK_BUFFER,
    SET_DETOUCH_STADIA,
    SET_PROGRESS_PERCENT
} from './defineStrings';

// Инициализация библионетеки для компилации музыки
window.libopenmpt = window.Module;




const defaultState = {
    trackList: [],
    isPlay: false,
    currentTrack: null,
    player: null,
    currentPlayingNode: null,
    percent: 0
}

export const playerReduser = ( state = defaultState, action ) => {
    switch( action.type ){
        case GET_TRACK_LIST:
            return { ...state, trackList: [ ...state.trackList, ...action.payload] };
        case TOGGLE_PLAY:
            return { ...state, isPlay: action.payload }
        case SET_CURRENT_PLAYER_EXAMPLE:
            return { ...state, currentPlayingNode: action.payload }
        case CURRENT_TRACK: 
            return { ...state, currentTrack: action.payload }
        case SET_DETOUCH_STADIA:
            return { ...state, isDeTouch: action.payload }
        case SET_PROGRESS_PERCENT:
            return { ...state, percent: action.payload }
        default: 
            return state;
    }
}

const defaultBufferState = {};

export const bufferReduser = ( state = defaultBufferState, action ) => {
    switch (action.type){
        case SET_CURRENT_TRACK_BUFFER:
            /* WARNING  action.payload = { name: value }*/
            const name = action.payload.name;
            const value = action.payload.value
            const item = {};
            item[name] = value
            return { ...state, ...item };
        default:
            return state;
    }
}


export const palayerRedusers = combineReducers({
    playerData: playerReduser,
    buffer: bufferReduser
});