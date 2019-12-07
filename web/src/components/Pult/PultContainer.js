import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pult from './Pult';
import { getTrackList, togglePlay, setCurrentTrack, stop } from '../../store/actions'; 

class PultContainer extends Component{
    render(){
        const { trackList, track, play, togglePlay, player, currentPlayingNode, stop } = this.props;
        return(
            <Pult
                trackList={trackList}
                track={track}
                play={play}
                togglePlay={togglePlay}
                player={player}
                currentPlayingNode={currentPlayingNode}
                stop={stop}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        trackList: state.playerData.trackList,
        track: state.playerData.currentTrack,
        play: state.playerData.isPlay, 
        player: state.playerData.player,
        currentPlayingNode: state.playerData.currentPlayingNode
    };
};
const mapDispatchToProps = {
    getTrackList,
    togglePlay,
    setCurrentTrack,
    stop
}

export default connect(mapStateToProps, mapDispatchToProps)(PultContainer);