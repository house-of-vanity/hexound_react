import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './App.css';
import TrackListContainer from './components/TackList/TrackListContainer';
import PultContainer from './components/Pult/PultContainer';
import GrabnDropContainer from './components/GrabnDrop/GrabnDropContainer';
import { Credits } from './components/Credits/Credits';

class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <div>
          <GrabnDropContainer/>
          <h1>hexor</h1>
          <PultContainer/>
          <TrackListContainer/>
          <Credits/>
        </div>
      </Provider>
    );
  }  
}

export default App;
