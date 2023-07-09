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
import classnames from 'classnames';
import { Button as AButton, Form as AForm, Input as AInput, Space as ASpace, Switch} from 'antd';

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
  TabContent,
  TabPane,
  ButtonToggle,
  Nav,
  CardText,
  NavLink,
  NavItem,
  Input
} from "reactstrap";
// core components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function DataDashboard() {
  const [top_gainers, setTopGainers] = useState();
  const [top_losers, setTopLosers] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const time_range = 'daily';
  const API_URL = process.env.REACT_APP_API_URL
  const { Search } = AInput;

  function get_top_gainers_or_losers(type){
    fetch(`${API_URL}/data/stock/get_top_${type}/${time_range}`)
    .then((response) => response.json())
    .then((responseData) => {
      if (type === 'gainers'){
        setTopGainers(JSON.parse(responseData['content']))
      }
      else{
        setTopLosers(JSON.parse(responseData['content']))
      }
    }).catch(error => console.warn(error))
  }

  useEffect(() => {  
    get_top_gainers_or_losers('gainers')
    get_top_gainers_or_losers('losers')},[])


  function toggletab(tab) {
      if (activeTab !== tab) {
          setActiveTab(tab)
      }
  }


  function TopGainersOrLosers(type, height) {
    const style = {
      maxHeight: `${height}px`,
      //maxWidth: `6in`,
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

        <Nav tabs fill >
            <NavItem >
                <NavLink active={activeTab === '1'} to="#" onClick={()=> {toggletab('1');}} style={{color: 'black'}}>
                    Equity
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink active={activeTab === '2'}  to="#" onClick={()=> {toggletab('2');}} style={{color: 'black'}}>
                    Credit
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink active={activeTab === '3'} to="#" onClick={()=> {toggletab('3');}} style={{color: 'black'}}>
                    FX
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink active={activeTab === '4'} to="#" onClick={()=> {toggletab('4');}} style={{color: 'black'}}>
                    Rates
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink active={activeTab === '5'} to="#" onClick={()=> {toggletab('5');}} style={{color: 'black'}}>
                    Bonds
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink active={activeTab === '6'} to="#" onClick={()=> {toggletab('6');}} style={{color: 'black'}}>
                    Crypto
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink active={activeTab === '7'} to="#" onClick={()=> {toggletab('7');}} style={{color: 'black'}}>
                    Datasets
                </NavLink>
            </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
            <Row>
                <Col md="6">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h8">Top Gainers</CardTitle>
                        </CardHeader>
                        <CardBody>
                            {TopGainersOrLosers("gainers", 400, 200)}
                        </CardBody>
                    </Card>
                </Col>
                <Col md="6">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h8">Top Losers</CardTitle>
                        </CardHeader>
                        <CardBody>
                            {TopGainersOrLosers("losers", 400, 200)}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader tag="h5">Datasets</CardHeader>
                        <CardBody>
                            <Row >
                            <NavLink href="/admin/data/data_warehouse/cds">
                                <li>
                                    Sample1
                                </li>
                            </NavLink>
                            </Row>
                            <Row >
                            <NavLink href="/admin/data/data_warehouse/cds">
                                <li>
                                    Sample2
                                </li>
                            </NavLink>
                            </Row>
                            <Row>
                            <NavLink href="/admin/data/data_warehouse/cds">
                                <li>
                                    Sample3
                                </li>
                            </NavLink>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            </TabPane>
        </TabContent>
        <TabContent activeTab={activeTab}>
            <TabPane tabId="2">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader tag="h5">Public infos</CardHeader>
                            <CardBody>placeholder</CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader tag="h5">Datasets</CardHeader>
                            <CardBody>
                                <Row >
                                <NavLink href="/admin/data/data_warehouse/cds">
                                    <li>
                                        CDS Data
                                    </li>
                                </NavLink>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </TabPane>
        </TabContent>
        <TabContent activeTab={activeTab}>
            <TabPane tabId="7">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                            <CardTitle>
                                <CardTitle tag="h4">Search datasets</CardTitle>
                            </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Search
                                    placeholder="Search datasets"
                                    allowClear
                                    size="large"
                                    // onSearch={onSearch}
                                    // style={{
                                    //     width: 200,
                                    // }}
                                    />
                                    
                                </Form>
                                <Button>New Dataset</Button>
                                
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                            <CardTitle>
                                <CardTitle tag="h4">Databases</CardTitle>
                            </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Row >
                                <NavLink href="/admin/data/data_warehouse/cds">
                                    <li>
                                        CDS Data
                                    </li>
                                </NavLink>
                                </Row>
                                <Row >
                                <NavLink href="/admin/data/data_warehouse/esg">
                                    <li>
                                        ESG Data
                                    </li>
                                </NavLink>
                                </Row>
                                <Row >
                                <NavLink href="/admin/data/data_warehouse/integrator">
                                    <li>
                                        Data Integrator
                                    </li>
                                </NavLink>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                            <CardTitle>
                                <CardTitle tag="h4">External Databases</CardTitle>
                            </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Row >
                                <NavLink href="https://wrds-www.wharton.upenn.edu/">
                                    <li>
                                        WRDS
                                    </li>
                                </NavLink>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                            <CardTitle>
                                <CardTitle tag="h4">Datasets Collection</CardTitle>
                            </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Row >
                                <NavLink href="/admin/data/sampledata">
                                    <li>
                                        Sampledata.csv
                                    </li>
                                    <li>
                                        Sampledata.csv
                                    </li>
                                    <li>
                                        Sampledata.csv
                                    </li>
                                </NavLink>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </TabPane>
        </TabContent>
        


      </div>
    </>
  );
}

export default DataDashboard;
