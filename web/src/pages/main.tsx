import React, { Component } from "react";
import TrackListContainer from "../components/tack-list/track-list-container";
import PultContainer from "../components/player-control-panel/hocs/track-list-panel-container";
import { Hero } from "../components/main-page-data";

export default class MainPage extends Component {
	render() {
		return (
			<>
				<Hero />
				<TrackListContainer />
				<PultContainer />
			</>
		);
	}
}
