import { useSelector } from "react-redux";
import { trackInPlayListSelector } from "../duck";
import { TrackDTO } from "../../../api";
import { RootState } from "../../../store/store";

export const useTrackInLocalPlayList = (track: TrackDTO) => {
	return useSelector((state: RootState) =>
		trackInPlayListSelector(state, track)
	);
};
