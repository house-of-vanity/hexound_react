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
