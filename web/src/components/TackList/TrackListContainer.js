import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrackList from './TrackList';
import { getTrackList, setCurrentTrack } from '../../store/actions'; 
import { getUrlByMethodParams } from '../../utils';
import { methodGetTrackList, baseUrl } from '../../define';

class TrackListContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            limit: 10,
            offset: 0,
        }
    }
    componentDidMount(){
        const params = this.state;
        const url = getUrlByMethodParams(baseUrl, params, methodGetTrackList);
        fetch(url).then((r)=>(r.json()), (rj)=>{console.log(rj)})
        .then((r)=>{
            this.props.getTrackList(r);
            this.setState(()=>({
                offset: params.limit + params.offset
            }));
        }, (rj)=>{console.log(rj)});
    }
    hendleGetTracks = () => {
        const { offset, limit } = this.state;
        const params = {offset , limit};
        const url = getUrlByMethodParams(baseUrl, params, methodGetTrackList);
        fetch(url).then((r)=>(r.json()), (rj)=>{console.log(rj)})
        .then((r)=>{
            this.props.getTrackList(r);
            this.setState(()=>({
                offset: params.limit + params.offset
            }));
        }, (rj)=>{console.log(rj)});
    }
    render(){
        const hendleGetTracks = this.hendleGetTracks;
        return(
            <TrackList
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
        isDeTouch: state.playerData.isDeTouch,
        currentTrack: state.playerData.currentTrack
    };
};
const mapDispatchToProps = {
    getTrackList: getTrackList,
    setCurrentTrack: setCurrentTrack
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackListContainer);