import React, { Component } from 'react';
import './TrackList.css';
import { getTemplateDate } from '../../utils';
export default class TrackList extends Component{
    handleOnClick = (trackID)=> {
        const { isDeTouch, trackList } = this.props;
        if(!isDeTouch){
            this.props.setCurrentTrack(trackList[trackID]);
        }
    }
    handleActiveTrack = (id) => {
        const { currentTrack } = this.props;
        if(currentTrack !== null){
            return (+id === currentTrack.id) ? 'active' : '';
        } else {
            return '';
        }        
    }
    render(){  
        const { handleActiveTrack: getActive } = this;      
        const { trackList, playList, hendleGetTracks, isDeTouch, hasItems } = this.props;


        let styleObj = {};

        if(isDeTouch){
            styleObj.opacity ='0.6'; 
        }
        else {
            delete styleObj.opacity
        }

        return(
            <div className={`track-list`}>
                <div className={`container`}>
                    <h2>TrackList</h2>                
                </div>
                <div className={`track-list__container`}>
                    <ul style={styleObj} className={`track-list__list`}>
                        {playList.map((id)=>(
                            <li 
                                className={`track-list__list__item ${getActive(id)}`}
                                key={id}
                                onClick={()=>(this.handleOnClick(id))}
                            >
                                {trackList[id].title} (добавлено: {getTemplateDate(trackList[id].time)})
                            </li>
                        ))}
                    </ul>
                </div>                
                <div className={`container`}>
                    {hasItems && <div onClick={hendleGetTracks}>Ещё</div>}
                </div>                
            </div>
        )
    }
}
