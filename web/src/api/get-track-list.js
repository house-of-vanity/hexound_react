import { request } from "./request";

export const getTrackList = ({ limit, offset }) =>
	request.get("/mods", { params: { limit, offset } }).then(({ data }) => data);
