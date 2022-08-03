import React from "react";
import { useState } from "react";
import { Link, navigate } from "gatsby";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import Seo from "../components/seo";

// TODO: Global variables are bad, but I failed to pass through state parameter in link so works for now
export let midiInput = null;


function onMIDIFailure(msg) {
  console.log( "Failed to get MIDI access - " + msg );
}

function getMidiDevices( midiAccess ) {
  if ( midiAccess === "Loading" ) {
    return "No midi inputs";
  } else {
    let inputs = [];
    for (let entry of midiAccess.inputs) {
      let input = entry[1];
      inputs.push({"name": input.name, "id": input.id});
      console.log(input.id);
    }
    return inputs;
  }
}

const IndexPage = () => {
  const [midiAccess, setMidiAccess] = useState(null);
  const [devices, setDevices] = useState([]);
  const [inputChosen, setInputChosen] = useState(false);

  navigator.requestMIDIAccess().then( ( access ) => {
    if ( midiAccess == null ) {
      setMidiAccess(access);
      setDevices(getMidiDevices( access ));
    }
  }, onMIDIFailure);

  function updateMidiDevices() {
    setDevices(getMidiDevices( midiAccess ));
  }

  const selectMidiDevice = (e) => {
    let id = e.target.value;
    console.log(id);
    if ( midiAccess.inputs.size === 0 ) {
      console.log("No MIDI Input");
    } else {
      let newInput = midiAccess.inputs.get(id);
      midiInput = newInput; // TODO: Don't use global variables
      setInputChosen(true);
    }
  }
  
  return (
    <div className="home-flex">
      <h1>Piano Analysis</h1>
      <p>10x your playing</p>
      <p>Select your midi device</p>
      <Seo title="Home" />
      <Form.Select 
        aria-label="Default select example"
        onChange={selectMidiDevice}>
        <option>Select Midi Device</option>
        {devices.map( device => (
            <option value={device.id}
                    key={device.name}>
                      {device.name}
            </option>
        ))}
      </Form.Select>
      {inputChosen ? (
        <div>
        <p>And choose what to analyse</p>
        <ButtonGroup aria-label="Basic example" vertical>
          <Button variant="outline-primary" onClick={() => navigate("/exercise-analysis")}>Exercises</Button>
          <Button variant="outline-primary" onClick={() => navigate("/polyrythm")}>Polyrythm</Button>
          <Button variant="outline-primary" onClick={() => navigate("/")}>(Pedaling)</Button>
          <Button variant="outline-primary" onClick={() => navigate("/")}>(Chords)</Button>
          <Button variant="outline-primary" onClick={() => navigate("/")}>(Pieces)</Button>
        </ButtonGroup>
        </div>
      ) : (
        <div></div>
      )
      }
    </div>
  );
}

export default IndexPage;

  /*
  TODO: 
    Handle no devices connected
    Add refresh button
  */
