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


function putToCache(elem, cache){
    if(cache.indexOf(elem) != -1){
        return;
    }
    var i = Math.floor(Math.random()*(cache.length + 1));
    cache.splice(i, 0, elem);
}
function madness(){
    var cache = [];
    return function(a, b){
        putToCache(a, cache);
        putToCache(b, cache);
        return cache.indexOf(b) - cache.indexOf(a);
    }
}
export function shuffle(arr){
    var compare = madness();
    return arr.sort(compare);
}