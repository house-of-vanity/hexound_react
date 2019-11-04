
import { combineReducers } from "redux"; 
import { GET_TRACK_LIST,  TOGGLE_PLAY, CURRENT_TRACK } from './defineStrings';

// Инициализация библионетеки для компилации музыки
window.libopenmpt = window.Module;

const getPlayer = () => {
    const ChiptuneJsConfig = window.ChiptuneJsConfig;
    const ChiptuneJsPlayer = window.ChiptuneJsPlayer;
    const player = new ChiptuneJsPlayer(new ChiptuneJsConfig(0));
    return player;
}

const defaultState = {
    trackList: [],
    isPlay: false,
    currentTrack: null,
    player: getPlayer()
}

export const playerReduser = ( state = defaultState, action ) => {
    switch( action.type ){
        case GET_TRACK_LIST:
            return { ...state, trackList: [ ...state.trackList, ...action.payload] }
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