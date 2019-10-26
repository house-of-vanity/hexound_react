import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrackList from './TrackList';
import { getTrackList } from '../../store/actions'; 

class TrackListContainer extends Component{
    render(){
        return(
            <TrackList
                trackList={this.props.trackList}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        trackList: state.playerData.trackList,
    };
};
const mapDispatchToProps = {
    getTrackList: getTrackList
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackListContainer);