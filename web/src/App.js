import React, { Component } from 'react'
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
        <div className={`main`}>
          <GrabnDropContainer/>
          <div className={`container`}>
            <h1 className={`main__title`}>hexound <span className={`util`}>v2</span></h1>
          </div>  
          <PultContainer/>      
          <div className={`container`}>
              <TrackListContainer/>
          </div>
          <Credits/>
        </div>
      </Provider>
    );
  }  
}

export default App;
