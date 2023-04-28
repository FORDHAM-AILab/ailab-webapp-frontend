/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {Component} from 'react';
import { Line, Pie } from "react-chartjs-2";
//import colorschemes from "chartjs-plugin-colorschemes/src/colorschemes";
//import {Chart} from 'chart.js';
// import "chartjs-plugin-colorschemes";
// import colorschemes from "chartjs-plugin-colorschemes/src/colorschemes";

const Classic20 = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5'];


export function MyChart(chartdata) {
  console.log(chartdata)

  if (chartdata == null || chartdata == undefined){
    console.log("???")
    return (<></>)
  }
  console.log(chartdata)
  const data = {
    labels: chartdata['chartdata']['labels'],
    datasets: chartdata['chartdata']['datasets']
  };
   const options = {
    legend: {
      display: true
    },
    tooltips: {
      enabled: false
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "xy"
        }
      },
      // colorschemes: {scheme: Classic20}
    },
    scales: {
      y: {
        ticks: {
          color: "#9f9f9f",
          beginAtZero: false,
          maxTicksLimit: 5,
        },
        grid: {
          drawBorder: true,
          display: false,
        },
      },
      x: {
        barPercentage: 1.6,
        grid: {
          drawBorder: true,
          display: false,
        },
        ticks: {
          padding: 20,
          color: "#9f9f9f",
        },
      },
    }
  }
   return (
     <>
      <Line
      data = {data}
      options = {options}
      width={400}
      height={100}
      />
    </>
    )
}

export function chart_data_parser(data){
  /*
    data should be of format: {'col1': [...], 'col2': [...] ... }
  */


  const dataset = [];
  let labels;
  if ("date" in data){
    labels = data["date"];
    delete data["date"];
  }
  else if ("Date" in data){
    labels = data["Date"];
    delete data["Date"];
  }
  else if ("datadate" in data){
      labels = data['datadate']
      delete data['datadate']
  }
  else{
    labels = [...Array(Object.keys(data).length).keys()];
  }
  for (let i = 0; i < Object.keys(data).length; i ++){
    let data_dict = {
      label:Object.keys(data)[i],
      pointRadius: 0,
      pointHoverRadius: 0,
      borderWidth: 3,
      borderColor: Classic20[i],
      tension: 0.4,
      fill: false,
      data: data[Object.keys(data)[i]]};
    dataset.push(data_dict)
  };

  const line_chart_data = {labels: labels, datasets: dataset};
  return line_chart_data;
}




