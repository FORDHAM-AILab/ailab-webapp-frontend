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
import React, { useState } from "react";
import DynamicTable from "components/Tables/table";
import StockChart from 'components/Charts/StockChart';
import {TypeChooser} from "react-stockcharts/lib/helper";
import { timeParse } from "d3-time-format";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import Form from 'react-bootstrap/Form';

function StockAnalysis() {
  const [ticker, setTicker] = useState('')
  const [analysis_info, setAnalysisInfo] = useState()
  const [stock_price_full_data, setStockPriceFullData] = useState([])
  const API_URL = process.env.REACT_APP_API_URL
  function get_analysis_info(){
    fetch(`${API_URL}/stock/get_analysis_info/${ticker}`)
    .then((response) => response.json())
    .then((responseData) => {
      let result = {};
      for (const [key,value] of Object.entries(responseData["result"])){
        result[key] = JSON.parse(value)
      }
      setAnalysisInfo(result)
    })
  }

  function get_stock_price_full_data (){
    function parseData(data) {
      console.log(data[0])
      for (var i = 0; i < data.length; i++){
        data[i]["date"] = timeParse("%Y-%m-%d")(data[i]["date"])
      }
      
      return data
    }

    const response = fetch(`${API_URL}/data/load_single_hist_stock_price/${ticker}/2017-01-01/2020-02-02`)
    .then((response) => response.text())
    .then((data) => parseData(JSON.parse(JSON.parse(data)["result"])))
    return response
  }


  function StockForm() {

    function handleSubmit(e){
      e.preventDefault();
      if (ticker === ""){
        alert('Please enter a symbol to begin with')
      }
      else{
        get_analysis_info()
        get_stock_price_full_data().then((data) => {setStockPriceFullData(data)})
      }

    }
  
    return (
      <div class="flexbox-container">
        <Form onSubmit = {handleSubmit} className = 'settings'>
          <Form.Group className="mb-3">
            <Form.Label>Enter a single stock symbol</Form.Label>
              <Form.Control 
                name="tickers" type="text" 
                value={ticker}
                onChange={e => setTicker(e.target.value)}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>   
    )
  }



  function StockChartComponent() {
    console.log(stock_price_full_data)
    if (stock_price_full_data.length > 0){
      return (
        <StockChart data={stock_price_full_data}/>
    )
    }
    else {
      return (<></>)
    }

  }



  function BasicAnalysis(name){
    if ((analysis_info != null) && (name in analysis_info)){
      return (
        <DynamicTable data={analysis_info[name]}></DynamicTable>
      )
    }
  }

  return (
    <>
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardBody>
              {StockForm()}
              <Nav>
              <NavLink style={{padding:0, offset:0}} href="/admin/stock/full_analytics">Full Analytics</NavLink>
              </Nav>
              
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>Graph</CardHeader>
            <CardBody>
              {StockChartComponent()}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>News</CardHeader>
            <CardBody>
              
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>Earning Analysis</CardHeader>
            <CardBody>
              {BasicAnalysis('Earnings Estimate')}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>Revenue Estimate</CardHeader>
            <CardBody>
              {BasicAnalysis('Revenue Estimate')}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>Earnings History</CardHeader>
            <CardBody>
              {BasicAnalysis('Earnings History')}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>EPS Trend</CardHeader>
            <CardBody>
              {BasicAnalysis('EPS Trend')}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>Growth Estimates</CardHeader>
            <CardBody>
              {BasicAnalysis('Growth Estimates')}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>

    </>
  );
}

export default StockAnalysis;
