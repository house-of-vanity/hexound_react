import React, { Component } from 'react';
import { baseUrl } from '../../define';



export default class Pult extends Component{
    componentDidMount(){
    }


    handlePlayPause = () => {
        /* TODO set load track in player */
        const {track, play, togglePlay, currentPlayingNode } = this.props;
        togglePlay(!play);
    }

    render(){       
        const { handlePlayPause } = this;
        const { trackList: list, track, play, togglePlay, currentPlayingNode, state } = this.props;
        const currentTrackName = (track === null) ? '' : track.filename;
        return(
            <div>
                <h2>Pult, play: {`${play}`}, track: {currentTrackName}</h2>
                <span 
                    style={{
                        cursor:'pointer'
                    }}
                    onClick={handlePlayPause}>{
                    (play)
                    ? 'pause'
                    : 'play'
                }</span>
            </div>           
        )
    }
}