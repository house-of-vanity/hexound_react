import React, { Component } from "react";
import TrackListContainer from "../components/tack-list/track-list-container";
import PultContainer from "../components/pult/pult-container";

export default class MainPage extends Component {
	render() {
		return (
			<>
				<TrackListContainer />
				<PultContainer />
			</>
		);
	}
}
