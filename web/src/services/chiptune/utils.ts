import { baseUrl } from "../../define";
import { player } from './index'

export const playTrackFormUrl = (url: string) => new Promise(function(resolve, reject){
    setTimeout(()=>{
        reject()
    }, 4000)
    player.load(url, (buffer: unknown)=>{
        resolve(true)
        player.play(buffer)
    })
})

export const playTrackById = (trackId: number)=> () => {
    const url = `${baseUrl}mod/${trackId}`
    return playTrackFormUrl(url)
}

