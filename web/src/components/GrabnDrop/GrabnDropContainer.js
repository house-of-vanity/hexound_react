import React, { Component } from 'react';
import { connect } from 'react-redux';
import GrabnDrop from './GrabnDrop';
import { getTrackList, togglePlay, setCurrentTrack } from '../../store/actions'; 

class PultContainer extends Component{
    render(){
        const { trackList, track, play} = this.props;
        return(
            <GrabnDrop
                trackList={trackList}
                track={track}
                play={play}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        trackList: state.playerData.trackList,
        track: state.playerData.currentTrack,
        play: state.playerData.isPlay
    };
};
const mapDispatchToProps = {
    getTrackList,
    togglePlay,
    setCurrentTrack
}

export default connect(mapStateToProps, mapDispatchToProps)(PultContainer);