import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pult from './Pult';
import { getTrackList, togglePlay, setCurrentTrack } from '../../store/actions'; 

class PultContainer extends Component{
    render(){
        const { trackList, track, play, togglePlay, player, currentPlayingNode, state } = this.props;
        return(
            <Pult
                trackList={trackList}
                track={track}
                play={play}
                togglePlay={togglePlay}
                player={player}
                currentPlayingNode={currentPlayingNode}
                state={state}
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
        state:state
    };
};
const mapDispatchToProps = {
    getTrackList,
    togglePlay,
    setCurrentTrack,
}

export default connect(mapStateToProps, mapDispatchToProps)(PultContainer);