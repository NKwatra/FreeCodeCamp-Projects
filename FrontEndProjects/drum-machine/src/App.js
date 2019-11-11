import React, {useState, useEffect} from 'react';
import './App.css';
import DrumMachine from "./DrumMachine"
import AppContext from './AppContext';

function App() {
  const appState = useState({displayText: ""})
  useEffect(() =>{
    const listener = document.addEventListener("keypress", (e)=>{
      const audioElement = document.getElementById(e.key.toUpperCase());
      if(audioElement != null)
        {
          const drumpad = audioElement.parentElement;
          drumpad.click();
        }
    });
    return () => {document.removeEventListener(listener)};
  },[])
  return (
    <AppContext.Provider value={appState}>
    <DrumMachine/>
    </AppContext.Provider>
  );
}

export default App;
