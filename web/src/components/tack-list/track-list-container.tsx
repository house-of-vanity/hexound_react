import React, { useEffect } from "react";
import { connect } from "react-redux";
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
import { RootState } from "../../store/store";

const TrackListContainer = (props: any) => {
	const { hasItems, getTrackList } = props;
	const {
		match: {
			params: { trackID },
		},
	} = props;

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
	}, [getTrackList, trackID]);

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
		isDeTouch: state.playerData.isDeTouch,
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
