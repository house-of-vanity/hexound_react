import { TrackDictDTO } from "../../../api";

/**
 * @description возвращает есть ли вероятность, что API может отдать ещё треки.
 *   Нужно из-за того, что API не может отдать данные для пагинации
 * @param limit { number } - количество треков
 * @param trackDict { TrackDictDTO } - справочник треков, полученных по API
 * @returns
 */
export const getApiHasItems = (limit: number, trackDict?: TrackDictDTO) =>
	trackDict && Object.keys(trackDict).length >= limit;
