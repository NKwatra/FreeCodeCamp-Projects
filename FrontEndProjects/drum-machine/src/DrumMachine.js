import React from 'react';
import "./App.css";
import DrumPad from './DrumPad';
import Display from './Display';


const pads = [{ keyCode: "Q", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", displayName:"Heater-1"},
    { keyCode: "W", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", displayName:"Heater-2"},
    { keyCode: "E", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", displayName:"Heater-3" },
    { keyCode: "A", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", displayName:"Heater-4" },
    { keyCode: "S", audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", displayName:"Clap" },
    { keyCode: "D", audio: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", displayName:"Open-HH" },
    { keyCode: "Z", audio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", displayName:"Kick-n'-Hat"},
    { keyCode: "X", audio:"https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", displayName:"Kick"},
    { keyCode: "C", audio:"https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3", displayName:"Closed-HH"}
]

const DrumMachine = () =>{
    return (
        <div id="drum-machine">
        <div id="pads-container">
                {pads.map((pad, index) => <DrumPad {...pad} key={index} />)}
        </div>
        <div id="settings-container">
            <Display/>
        </div>
        </div>
    )
} 

export default DrumMachine