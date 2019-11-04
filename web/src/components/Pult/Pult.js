import React, { Component } from 'react';

export default class Pult extends Component{
    render(){       
        const { trackList: list, track, play, togglePlay } = this.props;
        const currentTrackName = (track === null) ? '' : track.filename;
        return(
            <div>
                <h2>Pult, play: {`${play}`}, track: {currentTrackName}</h2>
                <span 
                    style={{
                        cursor:'pointer'
                    }}
                    onClick={()=>(togglePlay(!play))}>{
                    (play)
                    ? 'pause'
                    : 'play'
                }</span>
            </div>           
        )
    }
}