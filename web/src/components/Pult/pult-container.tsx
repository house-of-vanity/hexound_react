import React from "react";
import { connect } from "react-redux";
import { Pult } from "./pult";
import { RootState } from "../../store/store";
import { usePultActions } from "./use-pult-actions";
import { TrackDTO } from "../../api";

const mapStateToProps = (state: RootState) => ({
	track: state.playerData.currentTrack,
	play: state.playerData.isPlay,
	isDeTouch: state.playerData.isDeTouch,
	isRandom: state.playerData.isRandom,
	isLoop: state.playerData.isLoop,
});

export type PultContainerProps = ReturnType<typeof mapStateToProps>;

const PultContainer = (props: PultContainerProps) => {
	const { track, play, isDeTouch, isLoop, isRandom } = props;
	const {
		onEnded,
		onToggleLoop,
		onPlay,
		onStop,
		onToggleRandom,
	} = usePultActions();

	return (
		<Pult
			track={track as TrackDTO}
			play={play}
			onPlay={onPlay}
			onStop={onStop}
			isDeTouch={isDeTouch}
			onEnded={onEnded}
			onToggleRandom={onToggleRandom}
			isRandom={isRandom}
			onToggleLoop={onToggleLoop}
			isLoop={isLoop}
		/>
	);
};

export default connect(mapStateToProps, null)(PultContainer);
