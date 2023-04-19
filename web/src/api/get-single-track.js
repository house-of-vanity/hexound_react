import { request } from "./request";

export const getSingleTrack = (trackId) =>
	request.get(`/meta/${trackId}`).then(({ data }) => data);
