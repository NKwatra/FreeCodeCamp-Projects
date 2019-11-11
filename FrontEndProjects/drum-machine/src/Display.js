import React, {useContext} from 'react';
import AppContext from './AppContext';
import "./App.css"

const Display = () =>{
    const [appState] = useContext(AppContext);
    return (
        <div id="display">{appState.displayText}</div>
    )
}

export default Display