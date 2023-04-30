import { TrackDictDTO } from "../../../api";

/**
 * @description возвращает есть ли вероятность, что API может отдать ещё треки.
 *   Нужно из-за того, что API не может отдать данные для пагинации
 * @param limit { number } - количество треков
 * @param trackDict { TrackDictDTO } - справочник треков, полученных по API
 * @returns 
 */
export const getApiHasItems = (limit: number, trackDict?: TrackDictDTO) => trackDict && Object.keys(trackDict).length >= limit


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
