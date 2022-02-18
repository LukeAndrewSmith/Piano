import * as React from "react"
import { useState, useEffect } from "react"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"

import FunctionLayout from "../components/function-layout"
import Seo from "../components/seo"
import { ChartLayout } from "../components/charts"

import { updatePlayedNotes, updateExerciseAnalysisData, extractExerciseAnalysisData } from "../midi-analysis/midi-analysis"

import { midiInput } from './index';


function getChartData(exerciseData, graphs) {
  let titles = ["Velocity On", "Velocity Off", "Durations", "Intervals"]
  let data = [exerciseData.velocityOn, exerciseData.velocityOff, exerciseData.durations, exerciseData.intervals]
  let chartData = [[],[]]
  for ( let i=0; i<graphs.length; i++ ) {
    if ( graphs[i] ) {
      chartData[0].push(data[i])
      chartData[1].push(titles[i])
    }
  }
  return chartData
}

const Exercise_Analysis = () => {
  let [played, setPlayed] = useState([])
  let [graphs, setGraphs] = useState([true,true,true,true])
  let initExerciseData = {
    "velocityOn":   [],
    "velocityOff":  [],
    "intervals":    [],
    "durations":    [],
  }
  let [exerciseData, setExerciseData] = useState(initExerciseData)

  const onSelectedOptionsChange = (e) => {
    let newGraphs = [...graphs]
    newGraphs[e.target.id] = !newGraphs[e.target.id]
    setGraphs(newGraphs)
  }

  midiInput.onmidimessage = ( message ) => {
    let playedNew = updatePlayedNotes(message,played)
    // let exerciseDataNew = updateExerciseAnalysisData(exerciseData,playedNew) // TODO: this is not efficient, should simply update the existing array if slow
    let exerciseDataNew = extractExerciseAnalysisData(playedNew) // TODO: this is not efficient, should simply update the existing array if slow
    if ( exerciseDataNew.intervals.length > 1 ) {
      for (let i=exerciseDataNew.intervals.length-1; i>=0; i--) {
        if ( exerciseDataNew.intervals[i].value > 1000 ) { // TODO: let the user decide the interval
          playedNew = updatePlayedNotes(message,[])
          // exerciseDataNew = updateExerciseAnalysisData(initExerciseData,playedNew)
          exerciseDataNew = extractExerciseAnalysisData(playedNew)
          break
        }
      }
    }
    setPlayed(playedNew)
    setExerciseData(exerciseDataNew)
  }

  // const [options, setOptions] = useState([{id:0,name:'Velocity On',selected:true},{id:1,name:'Velocity Off',selected:true},{id:2,name:'Duration',selected:true},{id:3,name:'Intervals',selected:true}])
  const options = [{id:'0',name:'Velocity On',selected:true},{id:'1',name:'Velocity Off',selected:true},{id:'2',name:'Duration',selected:true},{id:'3',name:'Intervals',selected:true}]

  return (
  <FunctionLayout title="Exercise Analysis">
    {/* <Multiselect 
      // data={multiSelectState} 
      data={[{value:'0',label:'Velocity On',selected:true},{value:'1',label:'Velocity Off',selected:true},{value:'2',label:'Duration',selected:true},{value:'3',label:'Intervals',selected:true}]}
      onChange={handleChange}  
      multiple
      buttonText={function(options, select) {return "Graphs"}} 
    /> */}
    <DropdownButton
    alignRight
    title="Graphs"
    id="dropdown-menu-align-right"
    // onSelect={handleSelect}
    >
      {options.map(options => (
        <Dropdown.ItemText>
          <Form.Check
              type="checkbox"
              id={options.id}
              name={options.name}
              label={options.name}
              defaultChecked={options.selected}
              onChange={onSelectedOptionsChange}
          />
        </Dropdown.ItemText>
      ))}
    </DropdownButton>

    <ChartLayout chartData={getChartData(exerciseData, graphs)}></ChartLayout>
  </FunctionLayout>
  )
}

export default Exercise_Analysis
