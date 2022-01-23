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

import { Line, Pie } from "react-chartjs-2";
//import "chartjs-plugin-colorschemes";

export function StockPriceChart(stock_data) {
  console.log(stock_data)
  const data = {
    labels: stock_data['stock_data']['labels'],
    datasets: stock_data['stock_data']['datasets']
  }
   const options = {
    legend: {
      display: true},
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
      colorschemes: {scheme: "tableau.ColorBlind10"}
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





