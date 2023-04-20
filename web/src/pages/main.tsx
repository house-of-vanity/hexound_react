import React, { Component } from "react";
import TrackListContainer from "../components/TackList/TrackListContainer";
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
