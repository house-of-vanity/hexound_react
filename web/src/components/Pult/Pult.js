import React, { Component } from 'react';
import './Pult.css';
import Play from '../ActionBtn/Play';
import Pause from '../ActionBtn/Pause';
import Stop from '../ActionBtn/Stop';
import ForwardStep from '../ActionBtn/ForwardStep'
import RandomIcon from '../ActionBtn/Random'
import LoopIcon from '../ActionBtn/Loop'

export default class Pult extends Component{
    constructor(props){
        super(props);
        this.setProgress = this.setProgress.bind(this);
    }
    componentDidMount(){
        
    }


    handlePlayPause = () => {
        /* TODO set load track in player */
        const {play, togglePlay, isDeTouch } = this.props;
        if(!isDeTouch){
            togglePlay(!play);
        }        
    }

    handleStop = () => {
        const {stop, isDeTouch } = this.props;
        if(!isDeTouch){
            stop();
        } 
    }

    hendleSetNext = () => {
        const { onEnded } = this.props
        onEnded()
    }

    setProgress(e){
        const { setPositionByPercent } = this.props;
        const element = e.currentTarget;
        const {x, width} = element.getBoundingClientRect();
        const { clientX } = e.nativeEvent;
        const xWidht = clientX - x;
        const percent = xWidht / width;
        setPositionByPercent(percent);
    }

    render(){       
        const { handlePlayPause, handleStop, hendleSetNext } = this;
        const { track, play, percent, toggleRandom, isRandom, toggleLoop, isLoop } = this.props;
        const percentW = (percent <= 1) ? `${percent * 100}%` : `100%`;
        const currentTrackName = (track === null) ? '' : track.title;
        return(
            <div className={`pult`}>
                <div 
                    onClick={this.setProgress}
                    className={`pult__progress-wrap`}
                >
                    <div style={{width: percentW}} className={`pult__progress`}></div>
                </div>                
        <div className={`pult__trackname`}>{currentTrackName && `Current track: ${currentTrackName}`}</div>
                <div className={`pult__btnbox`}>
                    <span 
                        className={`pult__btn btn_toggle-play`} 
                        onClick={ handlePlayPause }>
                        {
                        (play)
                            ? <Pause width={'40px'} height={'40px'}/>
                            : <Play width={'35px'} height={'35px'}/>
                        }
                    </span>
                    <span
                        className={`pult__btn btn_stop`}
                        onClick={handleStop}
                    >
                        <Stop width={'40px'} height={'40px'}/>
                    </span>
                    <span
                        className={`pult__btn btn_stop`}
                        onClick={hendleSetNext}
                    >
                        <ForwardStep width={'40px'} height={'40px'}/>
                    </span>
                    <span
                        className={`pult__btn btn_toggle ${ (isRandom) && `active` }`}
                        onClick={toggleRandom}
                        style={{width: `40px`}}
                    >
                    <RandomIcon width={'20px'} height={'20px'}/>
                    </span>

                    <span
                        className={`pult__btn btn_toggle  ${ (isLoop) && `active` }`}
                        onClick={toggleLoop}
                        style={{width: `40px`}}
                    >
                    <LoopIcon width={'20px'} height={'20px'}/>
                    </span>
                </div>
            </div>           
        )
    }
}
