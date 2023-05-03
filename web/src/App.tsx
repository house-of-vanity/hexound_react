import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import "./App.css";
import { Credits } from "./components/credits/credits";
import Track from "./pages/track-page";
import MainPage from "./pages/main";
import LocalPlayListPage from "./pages/local-play-list-page";
import { PersistGate } from "redux-persist/integration/react";

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Router>
						<div className={`main`}>
							<Credits />

							<Switch>
								<Route exact path="/" component={() => <MainPage />} />
								<Route path={`/track/:trackID`} component={Track} />
								<Route path={`/playlist/local`} component={LocalPlayListPage} />
							</Switch>
						</div>
					</Router>
				</PersistGate>
			</Provider>
		);
	}
}

export default App;
