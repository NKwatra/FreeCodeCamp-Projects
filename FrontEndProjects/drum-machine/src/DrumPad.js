import React, {useContext} from 'react';
import "./App.css";
import AppContext from './AppContext';

const DrumPad = (props) => {

    const [appState, setState] = useContext(AppContext);

    const playAudio = (e) => {
        const drumPad = e.target;
        const audio = drumPad.children[0];
        const displayText = drumPad.id;
        audio.play();
        setState({
            ...appState, displayText : displayText
        })
    }


    return (
        <div className="drum-pad" id={props.displayName} onClick={playAudio}>{props.keyCode}
            <audio src={props.audio} className="clip" id={props.keyCode}></audio>
        </div>
    )
}

export default DrumPad