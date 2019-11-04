import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pult from './Pult';
import { getTrackList, togglePlay, setCurrentTrack } from '../../store/actions'; 

class PultContainer extends Component{
    render(){
        const { trackList, track, play, togglePlay} = this.props;
        return(
            <Pult
                trackList={trackList}
                track={track}
                play={play}
                togglePlay={togglePlay}
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