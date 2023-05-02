import React, { useCallback } from "react";
import { connect, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
	GetNextTrackParams,
	PlayerControlPanel,
} from "../components/player-control-panel";
import { setNextTrack } from "../../../features/track-list/duck/actions";

const mapStateToProps = (state: RootState) => ({
	track: state.playerData.currentTrack,
});

export type PultContainerProps = ReturnType<typeof mapStateToProps>;

const PultContainer = (props: PultContainerProps) => {
	const { track } = props;
	const dispatch = useDispatch<AppDispatch>();

	const getNext = useCallback(
		(params: GetNextTrackParams) => {
			dispatch(setNextTrack(params));
		},
		[dispatch]
	);

	return <PlayerControlPanel track={track} getNextTrack={getNext} />;
};

export default connect(mapStateToProps, null)(PultContainer);
