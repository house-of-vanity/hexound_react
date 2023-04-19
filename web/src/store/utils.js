import { baseUrl } from "../define";

const getLoadFunction = (track, player) => () => {
	const { id } = track;
	const loadPromise = new Promise(function (resolve, reject) {
		setTimeout(() => {
			reject();
		}, 4000);
		player.load(`${baseUrl}mod/${id}`, (buffer) => {
			resolve(true);
			player.play(buffer);
		});
	});
	return loadPromise;
};

const nullTrackLoad = () =>
	new Promise(function (resolve, reject) {
		resolve(false);
	});

export const getPlayerLoadFunction = (track, player) => {
	if (track === null) {
		return nullTrackLoad;
	} else {
		return getLoadFunction(track, player);
	}
};

function putToCache(elem, cache) {
	if (cache.indexOf(elem) !== -1) {
		return;
	}
	var i = Math.floor(Math.random() * (cache.length + 1));
	cache.splice(i, 0, elem);
}
function madness() {
	var cache = [];
	return function (a, b) {
		putToCache(a, cache);
		putToCache(b, cache);
		return cache.indexOf(b) - cache.indexOf(a);
	};
}
export function shuffle(arr) {
	var compare = madness();
	return arr.sort(compare);
}
