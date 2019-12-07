import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pult from './Pult';
import { getTrackList, togglePlay, setCurrentTrack, stop } from '../../store/actions'; 

class PultContainer extends Component{
    render(){
        const { trackList, track, play, togglePlay, player, currentPlayingNode, stop, isDeTouch } = this.props;
        return(
            <Pult
                trackList={trackList}
                track={track}
                play={play}
                togglePlay={togglePlay}
                player={player}
                currentPlayingNode={currentPlayingNode}
                stop={stop}
                isDeTouch={isDeTouch}
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
        currentPlayingNode: state.playerData.currentPlayingNode,
        isDeTouch: state.playerData.isDeTouch
    };
};
const mapDispatchToProps = {
    getTrackList,
    togglePlay,
    setCurrentTrack,
    stop
}

export default connect(mapStateToProps, mapDispatchToProps)(PultContainer);