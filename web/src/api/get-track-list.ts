import { request } from "./request";
import { TrackDictRequestDTO } from "./dto";

export const getTrackList = (params: TrackDictRequestDTO) =>
	request.get("/mods", { params }).then(({ data }) => data);
