import React, { Component } from "react";
import { connect } from "react-redux";
import Pult from "./Pult";
import {
	getTrackList,
	togglePlay,
	setCurrentTrack,
	stop,
	setPositionByPercent,
	onEnded,
	toggleRandom,
	toggleLoop,
} from "../../store/actions";

class PultContainer extends Component {
	render() {
		const {
			trackList,
			track,
			play,
			togglePlay,
			player,
			stop,
			isDeTouch,
			percent,
			setPositionByPercent,
		} = this.props;
		return (
			<Pult
				trackList={trackList}
				track={track}
				play={play}
				togglePlay={togglePlay}
				player={player}
				stop={stop}
				isDeTouch={isDeTouch}
				percent={percent}
				setPositionByPercent={setPositionByPercent}
				onEnded={this.props.onEnded}
				toggleRandom={this.props.toggleRandom}
				isRandom={this.props.isRandom}
				toggleLoop={this.props.toggleLoop}
				isLoop={this.props.isLoop}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		trackList: state.playerData.trackList,
		track: state.playerData.currentTrack,
		play: state.playerData.isPlay,
		player: state.playerData.player,
		isDeTouch: state.playerData.isDeTouch,
		percent: state.playerData.percent,
		isRandom: state.playerData.isRandom,
		isLoop: state.playerData.isLoop,
	};
};
const mapDispatchToProps = {
	getTrackList,
	togglePlay,
	setCurrentTrack,
	stop,
	setPositionByPercent,
	onEnded,
	toggleRandom,
	toggleLoop,
};

export default connect(mapStateToProps, mapDispatchToProps)(PultContainer);
