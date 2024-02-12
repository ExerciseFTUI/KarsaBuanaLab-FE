"use client"
// Importing necessary modules from Chart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

// Functional component
export default function PieChart({ detailGraph }) {
  // Refs for chart canvas and chart instance
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  var projectRunning = 10;
  var projectCancelled = 5;
  var projectFinshed = 20;

    if (detailGraph !== 0) {
        projectRunning = detailGraph.totalForRunning;
        projectCancelled = detailGraph.totalForCancelled;
        projectFinshed = detailGraph.totalForFinished;
    } 

  useEffect(() => {
    // Destroy the existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Get the 2D context of the chart canvas
    const myChartRef = chartRef.current.getContext('2d');

    // Create a new Chart instance
    chartInstance.current = new Chart(myChartRef, {
      type: 'pie',
      data: {
        labels: [`Running = ${projectRunning}`, `Cancelled = ${projectCancelled}`, `Finished = ${projectFinshed}`],
        datasets: [
          {
            data: [ projectRunning, projectCancelled, projectFinshed],
            backgroundColor: ['#03FCF0', '#FF8383', '#C2FC03'],
          },
        ],
      },
    });

    // Cleanup function to destroy the chart on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []); // Empty dependency array to run the effect only once on mount

  // Render the chart canvas
  return (
    <div>
        <div className="h-full w-full mt-6  items-center flex flex-col ">
            <h4 className={`text-xs  w-fit px-2 rounded-md font-medium bg-light_green text-start`}>
                Percentage of Project Status
            </h4>
            <div className="cursor-pointer w-3/5 h-3/w-3/5 flex flex-row justify-center ">
                <canvas ref={chartRef} className=' ' />
            </div>
        </div>
    </div>
  );
}
