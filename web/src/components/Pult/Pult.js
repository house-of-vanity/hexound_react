import React, { Component } from 'react';

export default class Pult extends Component{
    render(){       
        const { trackList: list, track, play } = this.props;
        const currentTrackName = (track === null) ? '' : track.filename;
        return(
            <h2>Pult, play: {`${play}`}, track: {currentTrackName}</h2>
        )
    }
}