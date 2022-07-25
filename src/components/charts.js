import * as React from "react"

import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  ComposedChart,
  Line,
  Bar,
} from 'recharts';

export const ChartLayout4 = ({ data, title }) => {
    const [data1, data2, data3, data4] = data;
    const [title1, title2, title3, title4] = title;
    return (
        <>
            <div className='row'>
                <div className='col'>
                    <DynamicComposedChart data={ data1 } title={title1}></DynamicComposedChart>
                </div>
                <div className='col'>
                    <DynamicComposedChart data={ data2} title = {title2}></DynamicComposedChart>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <DynamicComposedChart data={ data3 } title={title3}></DynamicComposedChart>
                </div>
                <div className='col'>
                    <DynamicComposedChart data={ data4 } title={title4}></DynamicComposedChart>
                </div>
            </div> 
        </>
    );
}

export const ChartLayout3 = ({ data, title }) => {
    const [data1, data2, data3] = data;
    const [title1, title2, title3] = title;
    return (
        <>
            <div className='row'>
                <div className='col'>
                    <DynamicComposedChart data={ data1 } title={title1}></DynamicComposedChart>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <DynamicComposedChart data={ data2 } title={title2}></DynamicComposedChart>
                </div>
                <div className='col'>
                    <DynamicComposedChart data={ data3 } title={title3}></DynamicComposedChart>
                </div>
            </div> 
        </>
    );
}

export const ChartLayout2 = ({ data, title }) => {
    const [data1, data2] = data
    const [title1, title2] = title
    return (
        <div className='row'>
           <div className='col'>
                <DynamicComposedChart data={ data1 } title={ title1 }></DynamicComposedChart>
            </div>
            <div className='col'>
                <DynamicComposedChart data={ data2 } title = { title2 }></DynamicComposedChart>
            </div>
        </div>
    );
}

export const ChartLayout1 = ({ data, title }) => {
    return (
        <div className='row'>
            <div className='col'>
                <DynamicComposedChart data={ data[0] } title={ title[0] }></DynamicComposedChart>
            </div>
        </div>
    );
}

const ChartTitleWrap = ({ title, children }) => {
    return (
        <div className='col-flex'>
            <h1>{title}</h1>
            <div className='col-flex-child'>{ children }</div>
        </div>
    );
}

export const ChartLayout = ({ chartData }) => {
    const [data, title] = chartData;
    switch(data.length) {
        case 1:
            return <ChartLayout1 data={data} title={title}></ChartLayout1>;
        case 2:
            return <ChartLayout2 data={data} title={title}></ChartLayout2>;
        case 3:
            return <ChartLayout3 data={data} title={title}></ChartLayout3>;
        case 4:
            return <ChartLayout4 data={data} title={title}></ChartLayout4>;
        default:
            console.log("Invalid data");
    };
}

export const DynamicComposedChart = ({ data, title }) => {
    let xDataKey = "";
    let yDataKey = "";
    if ( data.length > 0 ) {
        const keys = Object.keys(data[0]);
        xDataKey = keys[0];
        yDataKey = keys[1];
    }
    return (
        <ChartTitleWrap title={title}>
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
    );
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
