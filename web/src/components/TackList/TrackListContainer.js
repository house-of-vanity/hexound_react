import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrackList from './TrackList';
import { getTrackList, setCurrentTrack } from '../../store/actions'; 
import { getUrlByMethodParams } from '../../utils';
import { methodGetTrackList, baseUrl } from '../../define';

class TrackListContainer extends Component{
    componentDidMount(){
        const params = {
            limit: 10,
            offset: 0
        }
        const url = getUrlByMethodParams(baseUrl, params, methodGetTrackList);
        fetch(url).then((r)=>(r.json()), (rj)=>{console.log(rj)})
        .then((r)=>{
            this.props.getTrackList(r)
        }, (rj)=>{console.log(rj)});
    }
    render(){
        return(
            <TrackList
                trackList={this.props.trackList}
                setCurrentTrack={this.props.setCurrentTrack}
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
    getTrackList: getTrackList,
    setCurrentTrack: setCurrentTrack
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackListContainer);