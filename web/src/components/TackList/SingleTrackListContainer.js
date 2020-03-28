import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import fp from 'lodash/fp'
import { getPlayList } from '../../store/selectors'
import TrackList from './TrackList';
import { getTrackList, setCurrentTrack, getSingleTrack } from '../../store/actions'; 


class TrackListContainer extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        const { getSingleTrack } = this.props
        const { match: { params: { trackID } } } = this.props
        trackID && getSingleTrack(trackID)
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
    setCurrentTrack: setCurrentTrack,
    getSingleTrack: getSingleTrack
}

export default fp.flow(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(TrackListContainer)
// export default connect(mapStateToProps, mapDispatchToProps)(TrackListContainer);
