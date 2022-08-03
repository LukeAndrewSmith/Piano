import * as React from "react";
import { useState } from "react";
import anime from 'animejs/lib/anime.es.js';
import { max } from "lodash";

import FunctionLayout from "../components/function-layout";
import Incrementor from "../components/incrementor";

import { updatePlayedNotes, updateExerciseAnalysisData, extractExerciseAnalysisData } from "../midi-analysis/midi-analysis";
import { midiInput } from './index';

const SVGNS = "http://www.w3.org/2000/svg";
const SVG = 'polyrythmSVG';
const TEMPOPATH = "tempoPath";
const TEMPOINDICATOR = "tempoIndicator";
const BEATSLHGROUP = 'beatsLHGroup';
const BEATSRHGROUP = 'beatsRHGroup';

const Polyrythm = () => {
  
  const [polyrythm, setPolyrythm] = useState([1,2,64]); // [beatsLH, beatsRH, tempo]

  function incrementorCallback(beatsLH, beatsRH, tempo) {
    console.log(beatsLH, beatsRH, tempo);
    setPolyrythm([beatsLH, beatsRH, tempo]);
    createSVG(beatsLH, beatsRH, tempo);
    startAnimation(tempo);
  }

  function createSVG(beatsLH, beatsRH) {
    // Create SVG Element
    const polyrythmSVG = document.createElementNS(SVGNS, "svg");
    polyrythmSVG.setAttribute("id", SVG);

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

    // Beats
    const beatWidth = 10;
    const beatHeight = height/2;
    // LH Beats
    const beatsLHGroup = document.createElementNS(SVGNS, "g");
    beatsLHGroup.setAttribute('id', BEATSLHGROUP);
    polyrythmSVG.appendChild(beatsLHGroup);
    for (let i=0; i<=beatsLH; i++) {
      beatsLHGroup.appendChild(
        createRect(SVGNS,
                    `lhBeat${i}`,
                    widthPadding + i*(width/(beatsLH)) - beatWidth/2,
                    0,
                    beatWidth,
                    beatHeight,
                    'red' // TODO
                    )
        );
    }
    // RH Beats
    const beatsRHGroup = document.createElementNS(SVGNS, "g");
    beatsRHGroup.setAttribute('id', BEATSRHGROUP);
    polyrythmSVG.appendChild(beatsRHGroup);
    for (let i=0; i<=beatsRH; i++) {
      beatsRHGroup.appendChild(
        createRect(SVGNS,
                    `lhBeat${i}`,
                    widthPadding + i*(width/(beatsRH)) - beatWidth/2,
                    height/2,
                    beatWidth,
                    beatHeight,
                    'green' // TODO
                    )
        );
    }

    // Tempo path
    const tempoLine = document.createElementNS(SVGNS, "path");
    tempoLine.setAttribute("id", TEMPOPATH);
    tempoLine.setAttribute("stroke", "black");
    tempoLine.setAttribute("d", `M ${widthPadding} ${height/2} h ${width}`);
    polyrythmSVG.appendChild(tempoLine);

    const tempoIndicator = document.createElementNS(SVGNS, "rect");
    tempoIndicator.setAttribute("id", TEMPOINDICATOR);
    tempoIndicator.setAttribute("x", 0);
    tempoIndicator.setAttribute("y", (-(height/2)).toString());
    tempoIndicator.setAttribute("width", '2');
    tempoIndicator.setAttribute("height", height.toString());
    tempoIndicator.setAttribute("fill", 'black');
    polyrythmSVG.appendChild(tempoIndicator);

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

  function startAnimation(bpm) {

    const loopDuration = 60000/bpm; // TODO: this is wrong

    const beatsLHGroup = [...document.getElementById(BEATSLHGROUP).children];
    const beatsRHGroup = [...document.getElementById(BEATSRHGROUP).children];

    const beatsTimeline = anime.timeline({
      loop: true,
    });

    // Timing Animation
    beatsTimeline.add({
      targets: beatsLHGroup,
      duration: loopDuration,
    }, 0);

    // Beat animations
    const beatAnimationDuration = 100;
    const animationSettings = (beat, beatType='') => {
      switch(beatType) { 
        case 'start': // Animations reach there peak on the beat, hence we need some time before the beat for the animations to begin, this only affect the first beat as we can't offset to negative time, hence split the animation in two so it can begin at the end of the previous cycle
          return {
            targets: beat,
            easing: 'easeOutExpo',
            fill: ['#CCC', 'red'], // TODO
            width: ['15', '10'], // TODO: make these parameters dynamic
            translateX: ['-2.5', '0'],
            duration: beatAnimationDuration/2,
          };
        case 'end':
          return {
            targets: beat,
            easing: 'easeOutExpo',
            fill: ['red', '#CCC'], // TODO
            width: ['10', '15'], // TODO: make these parameters dynamic
            translateX: ['0', '-2.5'],
            duration: beatAnimationDuration/2,
          };
        default:
          return {
            targets: beat,
            easing: 'easeOutExpo',
            fill: ['red', '#CCC', 'red'], // TODO
            width: ['10', '15', '10'], // TODO: make these parameters dynamic
            translateX: ['0', '-2.5', '0'],
            duration: beatAnimationDuration,
          };
      }
    };
    const beatStartTime = (groupLength, i) => {
      const beatLength = (loopDuration/groupLength);
      return (beatLength*i); 
    } 
    const runBeatAnimations = (beatGroup) => {
      beatsTimeline.add(animationSettings(beatGroup[0], 'start'), 0);
      beatGroup.forEach((beat, i) => {
        if (i!=0) {
          beatsTimeline.add(animationSettings(beat),
                          beatStartTime(beatGroup.length-1, i) - beatAnimationDuration); // .length-1 as we include the first beat twice, on the left and right of the animation
        }
      });
      beatsTimeline.add(animationSettings(beatGroup[0], 'end'), loopDuration - (beatAnimationDuration/2));
    }
    runBeatAnimations(beatsLHGroup);
    runBeatAnimations(beatsRHGroup);

    const path = anime.path(document.getElementById(TEMPOPATH));
    beatsTimeline.add({
      targets: document.getElementById(TEMPOINDICATOR),
      translateX: path('x'),
      translateY: path('y'),
      rotate: path('angle'),
      easing: 'linear',
      duration: loopDuration,
      loop: true,
    }, 0);
  }

  function updateSVG() {
    document.getElementById(SVG); // TODO: Append new rects indicating where the user actually played
  }
  
  // TODO: add start/stop/reset/clear buttons + layout nicer
  // Add other visualisations, circular, etc..
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
