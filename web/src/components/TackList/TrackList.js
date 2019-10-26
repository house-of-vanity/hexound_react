import React, { Component } from 'react';

export default class TrackList extends Component{
    render(){
        
        const { trackList: list } = this.props;
        return(
            <h2>TrackList</h2>
        )
    }
}