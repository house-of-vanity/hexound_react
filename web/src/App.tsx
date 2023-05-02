import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./App.css";
import { Credits } from "./components/Credits/Credits";
import Track from "./pages/track-page";
import MainPage from "./pages/main";

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<div className={`main`}>
					<Credits />

					<Router>
						<Switch>
							<Route exact path="/" component={() => <MainPage />} />
							<Route path={`/track/:trackID`} component={Track} />
						</Switch>
					</Router>
				</div>
			</Provider>
		);
	}
}

export default App;
