import React, { Component } from 'react';
import { baseUrl } from '../../define';



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
            <div>
                <h2>Pult, play: {`${play}`}, track: {currentTrackName}</h2>
                <span 
                    style={{
                        cursor:'pointer'
                    }}
                    onClick={ handlePlayPause }>{
                    (play)
                    ? 'pause'
                    : 'play'
                }</span>
                <div>
                    <h4 onClick={handleStop}>STOP</h4>
                </div>
            </div>           
        )
    }
}