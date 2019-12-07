
import { combineReducers } from "redux"; 
import { GET_TRACK_LIST,  TOGGLE_PLAY, CURRENT_TRACK, SET_CURRENT_PLAYER_EXAMPLE } from './defineStrings';

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
    currentPlayingNode: null
}

export const playerReduser = ( state = defaultState, action ) => {
    console.log(action.type);
    switch( action.type ){
        case GET_TRACK_LIST:
            return { ...state, trackList: [ ...state.trackList, ...action.payload] };
            break;
        case TOGGLE_PLAY:
            return { ...state, isPlay: action.payload }
            break;
        case SET_CURRENT_PLAYER_EXAMPLE:
            console.log('REDUSER');
            return { ...state, currentPlayingNode: action.payload }
            break;
        case CURRENT_TRACK: 
            return { ...state, currentTrack: action.payload }
            break;
        default: 
            return state;
            break;
    }
}


export const palayerRedusers = combineReducers({
    playerData: playerReduser
});