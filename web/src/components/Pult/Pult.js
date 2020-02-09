import React, { Component } from 'react';
import './Pult.css';
import Play from '../ActionBtn/Play';
import Pause from '../ActionBtn/Pause';
import Stop from '../ActionBtn/Stop';




export default class Pult extends Component{
    componentDidMount(){
    }


    handlePlayPause = () => {
        /* TODO set load track in player */
        const {play, togglePlay, isDeTouch } = this.props;
        if(!isDeTouch){
            togglePlay(!play);
        }        
    }

    handleStop = () => {
        const {stop, isDeTouch } = this.props;
        if(!isDeTouch){
            stop();
        } 
    }

    render(){       
        const { handlePlayPause, handleStop } = this;
        const { trackList: list, track, play, stop} = this.props;


        const currentTrackName = (track === null) ? '' : track.filename;
        return(
            <div className={`pult`}>
                <div className={`pult__trackname`}>Current track: {currentTrackName}</div>
                <div className={`pult__btnbox`}>
                    <span 
                        className={`pult__btn btn_toggle-play`} 
                        onClick={ handlePlayPause }>
                        {
                        (play)
                            ? <Pause width={'40px'} height={'40px'}/>
                            : <Play width={'40px'} height={'40px'}/>
                        }
                    </span>
                    <span
                        className={`pult__btn btn_stop`}
                        onClick={handleStop}
                    >
                        <Stop width={'40px'} height={'40px'}/>
                    </span>
                </div>
            </div>           
        )
    }
}