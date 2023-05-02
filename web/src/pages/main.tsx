import React, { Component } from "react";
import TrackListContainer from "../components/tack-list/track-list-container";
// @ts-ignore
import logo from "../icons/hexound_logo.png";
import PultContainer from "../components/player-control-panel/hocs/track-list-panel-container";

export default class MainPage extends Component {
	render() {
		return (
			<>
				<div className={`container`}>
					<div className={`main__slide`}>
						<img src={logo} alt={`hexound`} />
						<div>
							<h2>Hellow</h2>
							<p>this is the best player for listening to chiptune</p>
						</div>
					</div>
				</div>
				<TrackListContainer />
				<PultContainer />
			</>
		);
	}
}
