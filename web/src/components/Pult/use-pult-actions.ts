import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import {
	togglePlay,
	stop,
	setPositionByPercent,
	onEnded,
	toggleRandom,
	toggleLoop,
} from "../../features/track-list/duck/actions";


export interface PultActions {
    onPlay: (play: boolean) => void
    onStop: () => void
    onSetPositionPercent: (percent: number ) => void
    onEnded: () => void
    onToggleRandom: () => void
    onToggleLoop: () => void
}


export const usePultActions = (): PultActions => {
    const dispatch = useDispatch()
    return bindActionCreators({onPlay: togglePlay,
        onStop: stop,
        onSetPositionPercent: setPositionByPercent,
        onEnded,
        onToggleRandom: toggleRandom,
        onToggleLoop: toggleLoop,}, dispatch)
}