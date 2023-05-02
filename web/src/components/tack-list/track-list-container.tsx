import React, { useCallback, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router";
// @ts-ignore
import fp from "lodash/fp";
import { getPlayList } from "../../features/track-list/duck/selectors";
import TrackList from "./track-list";
import {
	getTrackList,
	setCurrentTrack,
	getSingleTrack,
} from "../../features/track-list/duck/actions";
import { trackDictSlice } from "../../features/track-list/duck/slices";
import { RootState } from "../../store/store";

const TrackListContainer = (props: any) => {
	const { hasItems, getTrackList } = props;
	const {
		match: {
			params: { trackID },
		},
	} = props;

	const dispatch = useDispatch();

	const onReset = useCallback(() => {
		dispatch(trackDictSlice.actions.reset());
	}, [dispatch]);

	const handleGetTracks = () => {
		const { getTrackList } = props;
		getTrackList();
	};

	useEffect(() => {
		if (trackID) {
			getSingleTrack(trackID);
		} else {
			getTrackList();
		}
		return () => onReset();
	}, [getTrackList, trackID, onReset]);

	return (
		<TrackList
			hasItems={hasItems}
			playList={props.playList}
			trackList={props.trackList}
			setCurrentTrack={props.setCurrentTrack}
			isDeTouch={props.isDeTouch}
			hendleGetTracks={handleGetTracks}
			currentTrack={props.currentTrack}
		/>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		trackList: state.playerData.dict,
		playList: getPlayList(state),
		currentTrack: state.playerData.currentTrack,
		hasItems: state.playerData.hasItems,
	};
};
const mapDispatchToProps = {
	getTrackList: getTrackList,
	setCurrentTrack: setCurrentTrack,
	getSingleTrack: getSingleTrack,
};

export default fp.flow(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(TrackListContainer);
