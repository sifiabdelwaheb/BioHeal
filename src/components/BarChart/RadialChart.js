import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

import AnimatedPieHooks from './AnimatedPieHooks';
import { Button } from '@material-ui/core';

import './styles.css';

function RadialChart() {
  const generateData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value:
        value === null || value === undefined ? Math.random() * 100 : value,
    }));

  const [data, setData] = useState(generateData(0));
  const changeData = () => {
    setData(generateData());
  };

  useEffect(() => {
    setData(generateData());
  }, [!data]);

  return (
    <div className="App">
      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={changeData}
          className="btn-chart"
          style={{fontWeight:'bold'}}
        >
          Transform
        </Button>
      </div>
      <div className="container_app_chart">
        
        <div className="container_app_chart">
          <span className="label">Animated Pie Hooks</span>
          <AnimatedPieHooks
            data={data}
            width={400}
            height={400}
            innerRadius={100}
            outerRadius={200}
          />
        </div>
       
      </div>
    </div>
  );
}

export default RadialChart;
