import { 
    GET_TRACK_LIST,  
    TOGGLE_PLAY, 
    CURRENT_TRACK, SET_CURRENT_PLAYER_EXAMPLE, 
    SET_CURRENT_TRACK_BUFFER, 
    SET_DETOUCH_STADIA,
    SET_PROGRESS_PERCENT,
    DISPATCH_EVENT_ONENDED
} from './defineStrings';
import {playerLoadFunctionByCurrentTrack } from './utils';

export const getTrackList = (array) => ({
    type: GET_TRACK_LIST,
    payload: array
});

/* WARNING use redux-thunk */
export const togglePlay = (bool) => {
    return (dispatch, getState)=>{       
        const state = getState(); 
        const player = state.playerData.player;
        const currentPlayingNode = player.currentPlayingNode;
        const currentTrack = state.playerData.currentTrack;
        const loadFunction = playerLoadFunctionByCurrentTrack(currentTrack, player);        
        
        let result;

        switch(currentPlayingNode){
            case(null):
                result = loadFunction();
                break;
            default:
                result = true;
                player.togglePause();
                break;
        }
        dispatch(setDetouchStadia(true));
        if(typeof(result) === 'boolean'){
            dispatch({type: TOGGLE_PLAY,payload: bool});
            dispatch({ type: SET_CURRENT_PLAYER_EXAMPLE, payload: currentPlayingNode });
            dispatch(setDetouchStadia(false));
        }
        if(result instanceof Promise){
            result.then((resolve)=>{
                if(resolve === true){
                    dispatch({type: TOGGLE_PLAY,payload: bool});
                    dispatch({ type: SET_CURRENT_PLAYER_EXAMPLE, payload: currentPlayingNode });
                }   
                dispatch(setDetouchStadia(false));             
            }).catch(()=>{
                alert('togglePlay Трэк не был загружен');
                dispatch({type: TOGGLE_PLAY,payload: false});
                dispatch(setDetouchStadia(false));
            });
        }
    }
};

export const stop = () => {
    return (dispatch, getState) => {
        const player = getState().playerData.player;
        dispatch({type: TOGGLE_PLAY, payload: false});
        dispatch({ type: SET_CURRENT_PLAYER_EXAMPLE, payload: null });
        dispatch(setPercent(0));
        player.stop();
    }
}

/*export const setCurrentTrack = (obj) => ({
    type: CURRENT_TRACK,
    payload: obj
});*/

export const setCurrentTrack = (obj) => {
    return (dispatch, getState) => {
        dispatch({type: CURRENT_TRACK,payload: obj});
        const state = getState(); 
        const player = state.playerData.player;
        const currentTrack = obj;
        const currentPlayingNode = player.currentPlayingNode;
        const loadFunction = playerLoadFunctionByCurrentTrack(currentTrack, player);
        const result = loadFunction();
        dispatch({type: TOGGLE_PLAY,payload: false});
        player.stop();
        dispatch(setDetouchStadia(true));
        result.then((resolve)=>{
            if(resolve === true){
                dispatch({type: TOGGLE_PLAY,payload: true});
                dispatch({ type: SET_CURRENT_PLAYER_EXAMPLE, payload: currentPlayingNode });
            }  
            dispatch(setDetouchStadia(false));              
        }).catch(()=>{
            alert('setCurrentTrack Трэк не был загружен');
            dispatch({type: TOGGLE_PLAY,payload: false});
            dispatch({ type: SET_CURRENT_PLAYER_EXAMPLE, payload: null });
            dispatch(setDetouchStadia(false));
        });
    }
}


export const setDetouchStadia = (bool) =>(
    {
        type: SET_DETOUCH_STADIA,
        payload: bool
    }
);


export const setPercent = (float) =>({
    type: SET_PROGRESS_PERCENT,
    payload: float
})

export const onEnded = () => {

    return (dispatch, getState)=>{
        const { currentTrack, trackList } = getState().playerData;
        let currentTrackIndex = null;
        trackList.map((t, i)=>{
            if(t === currentTrack){
                currentTrackIndex = i;
            }
        })
        console.log(currentTrackIndex);
    }
}