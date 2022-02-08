import * as React from "react"
import { useState, useEffect } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import FunctionLayout from "../components/function-layout"
import Seo from "../components/seo"
import { DynamicLineChart, ChartLayout } from "../components/charts"

import { updatePlayedNotes, extractExerciseAnalysisData } from "../midi-analysis/midi-analysis"

import { midiInput } from './index';


const Exercise_Analysis = () => {

  const [exerciseData, setExerciseData] = useState({
    "velocityOn":   [],
    "velocityOff":  [],
    "intervals":    [],
    "durations":    [],
  })

  let played = []
  let exerciseDataLocal = {
    "velocityOn":   [],
    "velocityOff":  [],
    "intervals":    [],
    "durations":    [],
  }

  useEffect(() => {
    console.log(midiInput)
    midiInput.onmidimessage = ( message ) => {
      console.log(message)
      played = updatePlayedNotes(message,played)
      exerciseDataLocal = extractExerciseAnalysisData(played) // TODO: this is not efficient, should simply update the existing array if slow
      setExerciseData(exerciseDataLocal)
    }
  }, [])

  return (
  // <Layout title="Exercise Analysis">
  //   <Seo title="Exercise Analysis" />
  //   <div class='parent flex-parent'>
  //     <div class='child flex-child'>
  //       <h1>Velocity On</h1>
  //       <DynamicLineChart data={ exerciseData.velocityOn } title={"dd"}></DynamicLineChart>
  //     </div>
  //     <div class='child flex-child'>
  //       <h1>Velocity Off</h1>
  //       <DynamicLineChart data={ exerciseData.velocityOff }></DynamicLineChart>
  //     </div>
  //     <div class='child flex-child'>
  //       <h1>Intervals</h1>
  //       <DynamicLineChart data={ exerciseData.intervals }></DynamicLineChart>
  //     </div>
  //     <div class='child flex-child'>
  //       <h1>Durations</h1>
  //       <DynamicLineChart data={ exerciseData.durations }></DynamicLineChart>
  //     </div>
  //   </div>    
  //   <Link to="/">Go back to the homepage</Link>
  // </Layout>
  // Testing other layouts
  // <Layout title="Exercise Analysis">
  //   <div class='parent flex-parent'>
  //     <div class='child flex-child'>
  //       <h1>Velocity On</h1>
  //       <DynamicLineChart data={ exerciseData.velocityOn } title={"dd"}></DynamicLineChart>
  //     </div>
  //     <div class='child flex-child'>
  //       <h1>Velocity Off</h1>
  //       <DynamicLineChart data={ exerciseData.velocityOff }></DynamicLineChart>
  //     </div>
  //   </div>
  //   <div class='parent flex-parent'>
  //     <div class='child flex-child'>
  //       <h1>Intervals</h1>
  //       <DynamicLineChart data={ exerciseData.intervals }></DynamicLineChart>
  //     </div>
  //     <div class='child flex-child'>
  //       <h1>Durations</h1>
  //       <DynamicLineChart data={ exerciseData.durations }></DynamicLineChart>
  //     </div>
  //   </div>  
  // </Layout>
  <FunctionLayout title="Exercise Analysis">
    <ChartLayout exerciseData={exerciseData}></ChartLayout>
  </FunctionLayout>
  )
}



export default Exercise_Analysis
