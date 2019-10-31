import React, { Component } from 'react';
import { getTemplateDate } from '../../utils';
export default class TrackList extends Component{
    handleOnClick = (obj)=> {
        const { trackList: list } = this.props;
        this.props.setCurrentTrack(obj);
    }
    render(){        
        const { trackList: list } = this.props;
        return(
            <div>
            <h2>TrackList</h2>
                <ul>
                    { 
                        list.map((item)=>(
                            <li 
                                key={item.id}
                                onClick={()=>(this.handleOnClick(item))}
                            >
                                {item.filename} (добавлено: {getTemplateDate(item.time)})
                            </li>
                        ))
                     }
                </ul>
            </div>
        )
    }
}