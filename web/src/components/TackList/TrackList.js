import React, { Component } from 'react';
import { getTemplateDate } from '../../utils';
export default class TrackList extends Component{
    render(){        
        const { trackList: list } = this.props;
        return(
            <div>
            <h2>TrackList</h2>
                <ul>
                    { 
                        list.map((item)=>(
                            <li key={item.id}>{item.filename} (добавлено: {getTemplateDate(item.time)})</li>
                        ))
                     }
                </ul>
            </div>
        )
    }
}