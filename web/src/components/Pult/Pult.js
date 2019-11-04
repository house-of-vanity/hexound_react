import React, { Component } from 'react';
import { baseUrl } from '../../define';



export default class Pult extends Component{
    componentDidMount(){
    }

    render(){       
        const { trackList: list, track, play, togglePlay } = this.props;
        const currentTrackName = (track === null) ? '' : track.filename;
        return(
            <div>
                <h2>Pult, play: {`${play}`}, track: {currentTrackName}</h2>
                <span 
                    style={{
                        cursor:'pointer'
                    }}
                    onClick={
                        ()=>{
                            togglePlay(!play);
                            (()=>{
                                /* TODO удалить */
                                this.props.player.load(`${baseUrl}mod/daddy_freddy-under_the_bridge.mod`, (buffer)=>{
                                    this.props.player.play(buffer);
                                })
                            })()
                        }
                    }>{
                    (play)
                    ? 'pause'
                    : 'play'
                }</span>
            </div>           
        )
    }
}