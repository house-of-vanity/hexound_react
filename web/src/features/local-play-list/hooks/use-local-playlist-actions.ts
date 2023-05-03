import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { localPlayListSlice } from "../duck";
import { AppDispatch } from "../../../store/store";
import { TrackDTO } from "../../../api";

export interface LocalPlayListActions {
	add: (track: TrackDTO) => void;
	remove: (track: TrackDTO) => void;
}

export const useLocalPlayListActions = (): LocalPlayListActions => {
	const { actions } = localPlayListSlice;
	const dispatch = useDispatch<AppDispatch>();
	return bindActionCreators(actions, dispatch);
};
