import { useCallback } from "react";
import { useHistory } from "react-router";

export const useGoTrack = () => {
	const history = useHistory();

	const goTrack = useCallback(
		(id: string | number) => {
			history.push(`/track/${id}`);
		},
		[history]
	);

	return goTrack;
};
