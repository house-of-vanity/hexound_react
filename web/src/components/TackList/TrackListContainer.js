import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArrTracks, getPlayList } from '../../store/selectors'
import TrackList from './TrackList';
import { getTrackList, setCurrentTrack } from '../../store/actions'; 
import { getUrlByMethodParams } from '../../utils';
import { methodGetTrackList, baseUrl } from '../../define';

class TrackListContainer extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        const { getTrackList } = this.props;
        getTrackList();
    }
    hendleGetTracks = () => {
        const { getTrackList } = this.props;
        getTrackList();
    }
    render(){
        const hendleGetTracks = this.hendleGetTracks;
        const { hasItems } = this.props;
        return(
            <TrackList
                hasItems={hasItems}
                playList={this.props.playList}
                trackList={this.props.trackList}
                setCurrentTrack={this.props.setCurrentTrack}
                isDeTouch={this.props.isDeTouch}
                hendleGetTracks={hendleGetTracks}
                currentTrack={this.props.currentTrack}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        trackList: state.playerData.trackList,
        playList: getPlayList(state),
        isDeTouch: state.playerData.isDeTouch,
        currentTrack: state.playerData.currentTrack,
        hasItems: state.playerData.hasItems
    };
};
const mapDispatchToProps = {
    getTrackList: getTrackList,
    setCurrentTrack: setCurrentTrack
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackListContainer);
