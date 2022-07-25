import * as React from "react"
import { useState } from "react"

import FunctionLayout from "../components/function-layout"
import Incrementor from "../components/incrementor"

import { updatePlayedNotes, updateExerciseAnalysisData, extractExerciseAnalysisData } from "../midi-analysis/midi-analysis"
import { midiInput } from './index';

const SVGNS = "http://www.w3.org/2000/svg";

const Polyrythm = () => {
  
  const [polyrythm, setPolyrythm] = useState([1,2,64]); // [beatsLH, beatsRH, tempo]

  function incrementorCallback(beatsLH, beatsRH, tempo) {
    console.log(beatsLH, beatsRH, tempo);
    setPolyrythm([beatsLH, beatsRH, tempo]);
    createSVG(beatsLH, beatsRH, tempo);
  }

  return (
  <FunctionLayout title="Polyrythm">
    <Incrementor
      incrementorID={0}
      incrementorCallback={incrementorCallback}
      default={1}
    />
    <div id="polyrythmDIV"></div>
  </FunctionLayout>
  )
}

export default Polyrythm


function createSVG(beatsLH, beatsRH, tempo) {
    // Create SVG Element
    const polyrythmSVG = document.createElementNS(SVGNS, "svg");

    // TODO: make all the hardcoded values depend on the screen size;

    const widthPadding = 50;

    // Width/Height
    const width = 500;
    const paddedWidth = 500 + 2*widthPadding;
    const height = 500;
    polyrythmSVG.setAttribute("width", paddedWidth.toString());
    polyrythmSVG.setAttribute("height", height.toString());

    // Background
    polyrythmSVG.appendChild(createRect(SVGNS,'bg',0,0,'100%','100%','grey'));

    // Tempo path
    const tempoLine = document.createElementNS(SVGNS, "path");
    tempoLine.setAttribute("d", `M ${height/2} ${widthPadding} H ${widthPadding}`);
    polyrythmSVG.appendChild(tempoLine);

    // Beats
    const beatWidth = 10;
    const beatHeight = height/2;
    // LH Beats
    for (let i=0; i<beatsLH; i++) {
      polyrythmSVG.appendChild(
        createRect(SVGNS,
                    `lhBeat${i}`,
                    widthPadding + i*(width/(beatsLH-1)) - beatWidth/2,
                    0,
                    beatWidth,
                    beatHeight,
                    'red' // TODO
                    )
        );
    }

    // RH Beats
    for (let i=0; i<beatsRH; i++) {
      polyrythmSVG.appendChild(
        createRect(SVGNS,
                    `lhBeat${i}`,
                    widthPadding + i*(width/(beatsRH-1)) - beatWidth/2,
                    height/2,
                    beatWidth,
                    beatHeight,
                    'green' // TODO
                    )
        );
    }

    // Attach to document
    document.getElementById("polyrythmDIV").replaceChildren();
    document.getElementById("polyrythmDIV").appendChild(polyrythmSVG);
}

function createRect(svgNS,name,x,y,width,height,color) {
  const rect = document.createElementNS(svgNS, "rect");
  rect.setAttribute("id", name);
  rect.setAttribute("x", x.toString());
  rect.setAttribute("y", y.toString());
  rect.setAttribute("width", width.toString());
  rect.setAttribute("height", height.toString());
  rect.setAttribute("fill", color);
  return rect;
}

function updateSVG() {
  document.getElementById("polyrythmSVG"); // TODO: Append new rects indicating where the user actually played
}
