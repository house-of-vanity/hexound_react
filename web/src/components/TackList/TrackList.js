import React, { Component } from 'react';
import './TrackList.css';
import { getTemplateDate } from '../../utils';
export default class TrackList extends Component{
    handleOnClick = (obj)=> {
        const { isDeTouch } = this.props;
        if(!isDeTouch){
            this.props.setCurrentTrack(obj);
        }
    }
    handleActiveTrack = (id) => {
        const { currentTrack } = this.props;
        if(currentTrack !== null){
            return (id === currentTrack.id) ? 'active' : '';
        } else {
            return '';
        }        
    }
    render(){  
        const { handleActiveTrack: getActive } = this;      
        const { trackList: list, hendleGetTracks, isDeTouch, hasItems } = this.props;


        let styleObj = {};

        if(isDeTouch){
            styleObj.opacity ='0.6'; 
        }
        else {
            delete styleObj.opacity
        }

        return(
            <div className={`track-list`}>
            <h2>TrackList</h2>
                <ul style={styleObj} className={`track-list__list`}>
                    { 
                        list.map((item)=>(
                            <li 
                                className={`track-list__list__item ${getActive(item.id)}`}
                                key={item.id}
                                onClick={()=>(this.handleOnClick(item))}
                            >
                                {item.filename} (добавлено: {getTemplateDate(item.time)})
                            </li>
                        ))
                     }
                </ul>
                {
                    hasItems && <div onClick={hendleGetTracks}>Ещё</div>
                }
                
            </div>
        )
    }
}