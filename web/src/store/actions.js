import { GET_TRACK_LIST,  TOGGLE_PLAY, CURRENT_TRACK, SET_CURRENT_PLAYER_EXAMPLE, SET_CURRENT_TRACK_BUFFER } from './defineStrings';
import { baseUrl } from '../define';

export const getTrackList = (array) => ({
    type: GET_TRACK_LIST,
    payload: array
});

/* WARNING use redux-thunk */
export const togglePlay = (bool) => {
    return (dispatch, getState)=>{        
        const player = getState().playerData.player;
        const currentPlayingNode = player.currentPlayingNode;


        dispatch({type: TOGGLE_PLAY,payload: bool});
        dispatch({ type: SET_CURRENT_PLAYER_EXAMPLE, payload: currentPlayingNode });
        
        switch(currentPlayingNode){
            case(null):
                player.load(`${baseUrl}mod/daddy_freddy-under_the_bridge.mod`, (buffer)=>{
                    player.play(buffer);
                });
                break;
            default:
                player.togglePause();
                break;
        }
    }
};

export const stop = () => {
    return (dispatch, getState) => {
        const player = getState().playerData.player;
        dispatch({type: TOGGLE_PLAY, payload: false});
        dispatch({ type: SET_CURRENT_PLAYER_EXAMPLE, payload: null });
        player.stop();
    }
}

export const setCurrentTrack = (obj) => ({
    type: CURRENT_TRACK,
    payload: obj
});
