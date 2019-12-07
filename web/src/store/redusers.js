
import { combineReducers } from "redux"; 
import { 
    GET_TRACK_LIST,  
    TOGGLE_PLAY, CURRENT_TRACK, 
    SET_CURRENT_PLAYER_EXAMPLE, 
    SET_CURRENT_TRACK_BUFFER,
    SET_DETOUCH_STADIA
} from './defineStrings';

// Инициализация библионетеки для компилации музыки
window.libopenmpt = window.Module;

const getPlayer = () => {
    const ChiptuneJsConfig = window.ChiptuneJsConfig;
    const ChiptuneJsPlayer = window.ChiptuneJsPlayer;
    const player = new ChiptuneJsPlayer(new ChiptuneJsConfig(0));
    window.__PLAYER__ = player;
    return player;
}

const defaultState = {
    trackList: [],
    isPlay: false,
    currentTrack: null,
    player: getPlayer(),
    currentPlayingNode: null,
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