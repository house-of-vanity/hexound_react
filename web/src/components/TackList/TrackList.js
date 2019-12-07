import React, { Component } from 'react';
import { getTemplateDate } from '../../utils';
export default class TrackList extends Component{
    handleOnClick = (obj)=> {
        const { isDeTouch } = this.props;
        if(!isDeTouch){
            this.props.setCurrentTrack(obj);
        }
    }
    render(){        
        const { trackList: list, hendleGetTracks, isDeTouch } = this.props;

        let styleObj = {};

        if(isDeTouch){
            styleObj.opacity ='0.6'; 
        }
        else {
            delete styleObj.opacity
        }

        return(
            <div>
            <h2>TrackList</h2>
                <ul style={styleObj}>
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
                <div onClick={hendleGetTracks}>Ещё</div>
            </div>
        )
    }
}