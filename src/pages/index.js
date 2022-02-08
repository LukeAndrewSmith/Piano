import * as React from "react"
import { useState, useEffect } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

// TODO: Global variables are bad, but I failed to pass through state parameter in link so works for now
export let midiInput = null

function onMIDISuccess( midiAccess ) {
  console.log(midiAccess)
  if ( midiAccess.inputs.size == 0 ) {
    console.log("No MIDI Input")
    return null
  } else {
    console.log("MIDI Input exists")
    // TODO: Should use midiAccess.inputs.get('value') where value (e.g 1951924834) is found from input.id and chosen by the user from among the list of possible inputs
    // console.log(midiAccess.inputs.get('1951924834'))
    const first = midiAccess.inputs.entries().next().value
    midiInput = first[1]
    return midiInput
  }
}

function onMIDIFailure(msg) {
  console.log( "Failed to get MIDI access - " + msg );
}

function listInputsAndOutputs( midiAccess ) {
  if ( midiAccess == "Loading" ) {
    return "No midi inputs"
  } else {
    let inputs = []
    for (let entry of midiAccess.inputs) {
      let input = entry[1];
      // console.log( "Input port [type:'" + input.type + "'] id:'" + input.id +
      //   "' manufacturer:'" + input.manufacturer + "' name:'" + input.name +
      //   "' version:'" + input.version + "'" );
      inputs.push(input.name)
    }
    return inputs
  }
}

function getMidiName( input ) {
  if ( input == "Loading" ) {
    return "Loading"
  } else {
    return input.name
  }
}

const IndexPage = () => {
  const [midi, setMidi] = useState("Loading");
  const [input, setInput] = useState("Loading");
  
  useEffect(() => { 
    // TODO: think this keeps getting called... should put it somewhere that get's called once
    navigator.requestMIDIAccess().then( ( midi ) => {
      const newInput = onMIDISuccess(midi)
      setInput(newInput)
      setMidi(midi)
    }, onMIDIFailure)
  }, [])
  
  return <Layout title="Piano Analysis">
    <Seo title="Home" />
    <p>Possible Midi connections: { listInputsAndOutputs( midi ) }</p>
    <p>Chosen midi input: { getMidiName( input ) } </p>
    <p>
      <Link to="/exercise-analysis">Exercise Analysis</Link> <br />
    </p>
  </Layout>
}

export default IndexPage
