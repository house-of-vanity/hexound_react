import { baseUrl } from '../define';

export const getSingle = (trackId) => {
    console.log(trackId)
    return fetch(`${baseUrl}/meta/${trackId}`).then((r)=>r.json())
}