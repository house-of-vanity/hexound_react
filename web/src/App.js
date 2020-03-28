import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './App.css';
import { Credits } from './components/Credits/Credits';
import logo from './icons/hexound_logo.png'
import MainPage from './pages/Main'
import Track from './pages/Track'

class App extends Component {


  render(){
    return (
      <Provider store={store}>
        <div className={`main`}>
        <Credits/>
        <div className={`container`}>
        <div className={`main__slide`}>
          <img src={logo} alt={`hexound`}/>
          <div>
            <h2>Hellow</h2>
            <p>this is the best player for listening to chiptune</p>
          </div>
        </div>
        </div>
        <Router>
          <Switch>
            <Route exact path="/" component={ (()=>(<MainPage />)) } />
            <Route path={`/:trackID`} component={Track}/>            
          </Switch>
        </Router>
        </div>
      </Provider>
    );
  }  
}

export default App;
