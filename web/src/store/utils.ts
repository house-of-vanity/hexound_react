function putToCache(elem: unknown, cache: unknown[]) {
	if (cache.indexOf(elem) !== -1) {
		return;
	}
	var i = Math.floor(Math.random() * (cache.length + 1));
	cache.splice(i, 0, elem);
}
function madness() {
	var cache: any[] = [];
	return function (a: unknown, b: unknown) {
		putToCache(a, cache);
		putToCache(b, cache);
		return cache.indexOf(b) - cache.indexOf(a);
	};
}
export function shuffle<T extends unknown = any>(arr:T[]): T[] {
	var compare = madness();
	return arr.sort(compare);
}
