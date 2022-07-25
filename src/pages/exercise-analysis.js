import * as React from "react";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import FunctionLayout from "../components/function-layout";
import Seo from "../components/seo";
import { ChartLayout } from "../components/charts";
import { updatePlayedNotes, updateExerciseAnalysisData, extractExerciseAnalysisData } from "../midi-analysis/midi-analysis";
import { midiInput } from './index';


function getChartData(exerciseData, graphs) {
  const titles = ["Velocity On", "Velocity Off", "Durations", "Intervals"];
  const data = [exerciseData.velocityOn, exerciseData.velocityOff, exerciseData.durations, exerciseData.intervals];
  const chartData = [[],[]];
  for ( let i=0; i<graphs.length; i++ ) {
    if ( graphs[i] ) {
      chartData[0].push(data[i]);
      chartData[1].push(titles[i]);
    }
  }
  return chartData;
}

const Exercise_Analysis = () => {
  const [played, setPlayed] = useState([]);
  const [graphs, setGraphs] = useState([true,true,true,true]);
  const initExerciseData = {
    "velocityOn":   [],
    "velocityOff":  [],
    "intervals":    [],
    "durations":    [],
  };
  const [exerciseData, setExerciseData] = useState(initExerciseData);
  const options = [{id:'0',name:'Velocity On',selected:true},{id:'1',name:'Velocity Off',selected:true},{id:'2',name:'Duration',selected:true},{id:'3',name:'Intervals',selected:true}];

  const onSelectedOptionsChange = (e) => {
    const newGraphs = [...graphs];
    newGraphs[e.target.id] = !newGraphs[e.target.id];
    setGraphs(newGraphs);
  }

  midiInput.onmidimessage = ( message ) => {
    let playedNew = updatePlayedNotes(message,played);
    // const exerciseDataNew = updateExerciseAnalysisData(exerciseData,playedNew) // TODO: this is not efficient, should simply update the existing array if slow
    let exerciseDataNew = extractExerciseAnalysisData(playedNew) // TODO: this is not efficient, should simply update the existing array if slow
    if ( exerciseDataNew.intervals.length > 1 ) {
      for (let i=exerciseDataNew.intervals.length-1; i>=0; i--) {
        if ( exerciseDataNew.intervals[i].value > 1000 ) { // TODO: let the user decide the interval
          playedNew = updatePlayedNotes(message,[]);
          // exerciseDataNew = updateExerciseAnalysisData(initExerciseData,playedNew)
          exerciseDataNew = extractExerciseAnalysisData(playedNew);
          break;
        }
      }
    }
    setExerciseData(exerciseDataNew);
    setPlayed(playedNew);
    console.log('Here');
  }


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
      alignright="true"
      title="Graphs"
      id="dropdown-menu-align-right"
      // onSelect={handleSelect}
      >
        {options.map(options => (
          <Dropdown.ItemText key={options.id}>
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
  );
}

export default Exercise_Analysis;
