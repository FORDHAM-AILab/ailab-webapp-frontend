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
import React, { useEffect, useState } from "react";
import DynamicTable from "components/Tables/table";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Table
} from "reactstrap";
// core components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Home() {
  const [top_gainers, setTopGainers] = useState();
  const [top_losers, setTopLosers] = useState();

  const time_range = 'daily';


  function get_top_gainers_or_losers(type){
    fetch(`http://localhost:8888/home/get_top_${type}/${time_range}`)
    .then((response) => response.json())
    .then((responseData) => {
      if (type === 'gainers'){
        setTopGainers(JSON.parse(responseData["result"]))
      }
      else{
        setTopLosers(JSON.parse(responseData["result"]))
      }
    }).catch(error => console.warn(error))
  }

  useEffect(() => {  
    get_top_gainers_or_losers('gainers')
    get_top_gainers_or_losers('losers')},[])


  function TopGainersOrLosers(type, height) {
    const style = {
      maxHeight: `${height}px`,
      maxWidth: `6in`,
      overflowY: 'auto',
      overflowX: 'auto'
    };

    if ((type === 'gainers') && (top_gainers != null)) {
      return (
        <div style={style}>
          <DynamicTable bordered height={height} data={top_gainers}></DynamicTable>
        </div>
      )
    }
    else if ((type === 'losers') && (top_losers != null)){
      return (
        <div style={style}>
          <DynamicTable bordered height={height} data={top_losers}></DynamicTable>
        </div>
      )
    }
  } 


  return (
    <>
    
      <div className="content">
        <Row>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Top Gainers</CardTitle>
              </CardHeader>
              <CardBody>
                {TopGainersOrLosers("gainers", 400, 200)}
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Top Losers</CardTitle>
              </CardHeader>
              <CardBody>
              {TopGainersOrLosers("losers", 400, 200)}
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
            <CardTitle tag="h5">Market News</CardTitle>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
