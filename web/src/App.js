import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { store } from './store/store';
import './App.css';
import TrackListContainer from './components/TackList/TrackListContainer';
import PultContainer from './components/Pult/PultContainer';
import GrabnDropContainer from './components/GrabnDrop/GrabnDropContainer';
import { Credits } from './components/Credits/Credits';
import logo from './icons/hexound_logo.png'

class App extends Component {


  render(){
    return (
      <Provider store={store}>
        <div className={`main`}>
        <Credits/>
        <div className={`container`}>
        <div className={`main__slide`}>
          <img src={logo} alt={`hexound`}/>
          <p>
            <h2>Hellow</h2>
            <p>this is the best player for listening to chiptune</p>
          </p>
        </div>
        </div>
        
        <TrackListContainer/>   
        <PultContainer/>          
        </div>
      </Provider>
    );
  }  
}

export default App;
