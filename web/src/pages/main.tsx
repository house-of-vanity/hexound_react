import React, { Component } from "react";
import TrackListContainer from "../components/tack-list/track-list-container";
import PultContainer from "../components/Pult/PultContainer";

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
