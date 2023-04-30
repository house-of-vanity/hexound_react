export const baseUrl = process.env.REACT_APP_BASE_URL;
export const methodGetTrackList = {
	type: "get",
	url: "mods?",
	params: { limit: "limit", offset: "offset" },
};
