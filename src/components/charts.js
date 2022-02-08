import * as React from "react"

import {
  ResponsiveContainer,
  Tooltip,
  Legend,
  LineChart,
  Line,
  BarChart,
  Bar,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis
} from 'recharts';

const ChartLayout = ({ exerciseData }) => {
    // return (
    //     <div>
    //         <div class='parent flex-parent'>
    //             <div class='child flex-child'>
    //                 <h1>Velocity On</h1>
    //                 <DynamicLineChart data={ exerciseData.velocityOn } title={"dd"}></DynamicLineChart>
    //             </div>
    //             <div class='child flex-child'>
    //                 <h1>Velocity Off</h1>
    //                 <DynamicLineChart data={ exerciseData.velocityOff }></DynamicLineChart>
    //             </div>
    //         </div>
    //         <div class='parent flex-parent'>
    //             <div class='child flex-child'>
    //                 <h1>Intervals</h1>
    //                 <DynamicLineChart data={ exerciseData.intervals }></DynamicLineChart>
    //             </div>
    //             <div class='child flex-child'>
    //                 <h1>Durations</h1>
    //                 <DynamicLineChart data={ exerciseData.durations }></DynamicLineChart>
    //             </div>
    //         </div> 
    //     </div> 
    // )
    return (
        // <div class='flex-grid'>
        <>
            <div class='row'>
                <div class='col'>
                    <DynamicLineChart data={ exerciseData.velocityOn } title={"Velocity On"}></DynamicLineChart>
                </div>
                <div class='col'>
                    <DynamicLineChart data={ exerciseData.velocityOff } title = {"Velocity Off"}></DynamicLineChart>
                </div>
            </div>
            <div class='row'>
                <div class='col'>
                    <h1>Intervals</h1>
                    <DynamicLineChart data={ exerciseData.intervals }></DynamicLineChart>
                </div>
                <div class='col'>
                    <h1>Durations</h1>
                    <DynamicLineChart data={ exerciseData.durations }></DynamicLineChart>
                </div>
            </div> 
        </>
        // </div>
    )
}

const ChartTitleWrap = ({ title, children }) => {
    return (
        <div class='col-flex'>
            <h1>{title}</h1>
            <div class='col-flex-child'>{ children }</div>
        </div>
    )
}

const DynamicLineChart = ({ data, title }) => {
    let xDataKey = ""
    let yDataKey = ""
    if ( data.length > 0 ) {
        let keys = Object.keys(data[0])
        xDataKey = keys[0]
        yDataKey = keys[1]
    }
    return (
        <ChartTitleWrap title={title}>
            {/* <box>Hi</box>
        </ChartTitleWrap> */}
            <CustomResponsiveContainer>
                <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xDataKey}/>
                    <YAxis />
                    <Line type="monotone" isAnimationActive={false} dataKey={yDataKey} stroke="#8884d8" />
                    <Bar type="monotone" isAnimationActive={false} dataKey={yDataKey} fill="#8884d8" />
                </ComposedChart>
            </CustomResponsiveContainer>
        </ChartTitleWrap>
    )
}

function CustomResponsiveContainer(props) {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          <ResponsiveContainer {...props} />
        </div>
      </div>
    );
  }


export { ChartLayout, DynamicLineChart }
