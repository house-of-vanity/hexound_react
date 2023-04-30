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
	percent: state.playerData.percent,
	isRandom: state.playerData.isRandom,
	isLoop: state.playerData.isLoop,
});

export type PultContainerProps = ReturnType<typeof mapStateToProps>;

const PultContainer = (props: PultContainerProps) => {
	const { track, play, isDeTouch, percent, isLoop, isRandom } = props;
	const {
		onEnded,
		onToggleLoop,
		onPlay,
		onStop,
		onSetPositionPercent,
		onToggleRandom,
	} = usePultActions();

	return (
		<Pult
			track={track as TrackDTO}
			play={play}
			onPlay={onPlay}
			onStop={onStop}
			isDeTouch={isDeTouch}
			percent={percent}
			onSetPositionPercent={onSetPositionPercent}
			onEnded={onEnded}
			onToggleRandom={onToggleRandom}
			isRandom={isRandom}
			onToggleLoop={onToggleLoop}
			isLoop={isLoop}
		/>
	);
};

export default connect(mapStateToProps, null)(PultContainer);
