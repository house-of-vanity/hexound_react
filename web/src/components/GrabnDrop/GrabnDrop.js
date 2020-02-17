import React, { Component } from 'react';

export default class TrackList extends Component{
    render(){       
        const { trackList: list, track, play } = this.props;
        const currentTrackName = (track === null) ? '' : track.title;
        return(
            <h2>GrabnDrop, play: {`${play}`}, track: {currentTrackName}</h2>
        )
    }
}
