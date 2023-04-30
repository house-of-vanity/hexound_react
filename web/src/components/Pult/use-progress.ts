import { useState, useEffect } from 'react'
import { player } from '../../services/chiptune'	
    

export const useProgress = () => {
    const [progress, setProgress] = useState<number>(0)

    useEffect(()=>{
        player.addHandler("onAudioprocess", function (e: any) {
		const postion = window.__PLAYER__.getPosition();
		if (postion !== 0) {
			const duration = window.__PLAYER__.duration();
			const percent = parseFloat(postion) / parseFloat(duration);
            setProgress(percent)
		} else {
            setProgress(0)
		}
	});
    }, [setProgress])

    return progress
}