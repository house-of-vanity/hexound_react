import React, { Component } from "react";
import { withRouter } from "react-router";
import SingleTrackListContainer from "../tack-list/SingleTrackListContainer";
import PultContainer from "../player-control-panel/hocs/track-list-panel-container";

class SingleTrackContainer extends Component {
	backOnMainPage = () => {
		const { history } = this.props;
		history.replace("/");
	};

	componentDidMount() {
		const {
			match: {
				params: { trackID },
			},
		} = this.props;
		!trackID && this.backOnMainPage();
	}

	render() {
		return (
			<>
				<button onClick={this.backOnMainPage}>Назад</button>
				<SingleTrackListContainer />
				<PultContainer />
			</>
		);
	}
}

export default withRouter(SingleTrackContainer);
