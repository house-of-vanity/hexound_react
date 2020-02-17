import { baseUrl } from '../define';

export const playerLoadFunctionByCurrentTrack = (currentTrack, player) => {
    if(currentTrack === null){
        return ()=>(new Promise(function(resolve, reject){
            resolve(false);
        }));
    } else {
        return ()=>{
            const modId = currentTrack.id;
            const loadProimise = new Promise(function(resolve, reject) {
                setTimeout(()=>{
                    reject();
                }, 4000);
                player.load(`${baseUrl}mod/${modId}`, (buffer)=>{
                    resolve(true);
                    player.play(buffer);
                });
            });            
            return loadProimise;
        }
    }
}
