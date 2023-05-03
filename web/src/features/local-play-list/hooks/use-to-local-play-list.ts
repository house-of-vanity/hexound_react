import { useCallback } from "react";
import { useHistory } from "react-router";

export const useToLocalPlayList = () => {
	const history = useHistory();

	const onToLocalPlayList = useCallback(() => {
		history.push("/playlist/local");
	}, [history]);

	return onToLocalPlayList;
};
