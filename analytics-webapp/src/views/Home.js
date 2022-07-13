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
  Table,
  NavLink,
  Nav
} from "reactstrap";
// core components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

function Home() {
  const [top_gainers, setTopGainers] = useState();
  const [top_losers, setTopLosers] = useState();

  const time_range = 'daily';

  const API_URL = process.env.REACT_APP_API_URL
  console.log(API_URL)
  function get_top_gainers_or_losers(type){
    fetch(`http://${API_URL}/home/get_top_${type}/${time_range}`)
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



  return (
    <>
    
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Welcome</CardTitle>
              </CardHeader>
              <CardBody>
                <p>
                  FERMI stands for Financial Engineering and Risk Management Initiatives. It is meat to serve faculty and students for teaching and research in the following aspects:
                  <br/>
                  <br/>
                  <li style={{"text-indent": 10}}>Scalable Computations</li>
                  <li style={{"text-indent": 10}}>Scalable and User-friendly Data Analytics and Storage</li>
                  <li style={{"text-indent": 10}}>Model playground and competitions</li>
                  <br/>
                  Want to collaborate? Please contact -- <br/> 
                  GitHub <a href="https://github.com/SammyCui/ailab-webapp">link</a>
                </p>
                
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Other Basic Infos</CardTitle>
              </CardHeader>
              <CardBody>
                <p>Some other descriptions</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
