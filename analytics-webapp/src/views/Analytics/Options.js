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

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col, Label, Input, Form, FormGroup, Button} from "reactstrap";
import DynamicTable from "components/Tables/table";


function OptionsAnalysis() {
  const [ticker, SetTicker] = useState();
  const [expiration_list, SetExpirationList] = useState([])
  const [expiration_date, SetExpirationDate] = useState()
  const [options_type, SetOptionsType] = useState("")
  const [options_specs, SetOptionsPricingSpecs] = useState({"method": "BS", "options_type": "call", "s":100, "k": 120, "vol": 0.15, "T": 1, "rf": 0.05, "div": 0, "N": 10})
  const [options_data, SetOptionData] = useState([])
  const [options_price, SetOptionsPrice] = useState()
  const API_URL = process.env.REACT_APP_API_URL



  function OptionsDataForm () {
    function ExpirationList () {
      return expiration_list.map((value, index) => {
        return <option>{value}</option>
      })
    }
    return (
      <div>
      <Form inline onSubmit={(e) => {e.preventDefault(); get_options_expiration_dates(ticker)}}>
        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
        <Label className="mr-sm-2">Ticker</Label>
        <Input type="text" onChange={(e) => {SetTicker(e.target.value)}} placeholder="eg. AAPL"/>
        <Button>Search</Button>
        </FormGroup>
      </Form>
      <Form inline onSubmit={(e) => {e.preventDefault(); get_options_data(ticker, expiration_date, options_type)}}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label className="mr-sm-2">Expiration Date</Label>
        <Input type="select" onChange={(e) => SetExpirationDate(e.target.value)}>
          {ExpirationList()}
        </Input>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label className="mr-sm-2">Options type</Label>
        <Input type="select" onChange={(e) => {SetOptionsType(e.target.value)}}>
          <option>Call</option>
          <option>Put</option>
        </Input>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
      </div>
    )
  }

  function OptionsDataTable () {
    const style = {
      maxHeight: `400px`,
      //maxWidth: `6in`,
      overflowY: 'auto',
      overflowX: 'auto'
    };
    if ((options_data != null) && (options_data.length > 0)){
      return (
        <div style={style}>
          <DynamicTable data={options_data}/>
        </div>
      )
    }
    else {
      return (
        <></>
      )
    }
  }


  function OptionPricing() {

    function Price () {
      if (options_price != null) {
        return (
            <p>Price: {options_price}</p>
        )
      }
    }

    function handleOnChange(e) {
      let val;
      if ((e.target.name != "method") && (e.target.name != "options_type")) {
        val = Number(e.target.value)
      }
      else {val = e.target.value}
      SetOptionsPricingSpecs((prevState) => ({
        ...prevState,
        [e.target.name]: val
      }))
    }

    function BinomialIterations() {
      if (options_specs["method"] === "Binomial Tree") {
        return (
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label className="mr-sm-2">Binomial Tree Steps (N)</Label>
            <Input type="number" name="N" onChange={handleOnChange}/>
        </FormGroup>
        )
      }
    }

    function handleOnSubmit (e) {
      e.preventDefault();
      console.log(options_specs)
      option_pricing(options_specs)
    }

    console.log(options_specs)
    return (
      <div>
      <Form inline onSubmit={handleOnSubmit}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label className="mr-sm-2">Pricing Method</Label>
          <Input type="select" name="method" onChange={handleOnChange}>
            <option>Black Sholes</option>
            <option>Binomial Tree</option>
          </Input>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label className="mr-sm-2">Options type</Label>
          <Input type="select" name="options_type" onChange={handleOnChange}>
            <option>Call</option>
            <option>Put</option>
          </Input>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label className="mr-sm-2">Spot Price (S)</Label>
          <Input type="text" name="s" onChange={handleOnChange}/>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label className="mr-sm-2">Strike Price (K)</Label>
          <Input type="text" name="k" onChange={handleOnChange}/>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label className="mr-sm-2">Volatility (Vol)</Label>
          <Input type="text" name="vol" onChange={handleOnChange}/>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label className="mr-sm-2">Time to Maturity (T)</Label>
          <Input type="text" name="T" onChange={handleOnChange}/>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label className="mr-sm-2">Risk-free Interest Rate (r)</Label>
          <Input type="text" name="rf" onChange={handleOnChange}/>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label className="mr-sm-2">Dividend Yield (d)</Label>
          <Input type="text" name="div" onChange={handleOnChange}/>
        </FormGroup>
        {BinomialIterations()}
        <Button>Calculate</Button>
      </Form>
      {Price()}
    </div>
    )
  }

  async function get_options_expiration_dates (ticker) {
    
    let request_url = `http://${API_URL}/options/get_options_expiration_date/${ticker}`;
    const response = await fetch(request_url);
    const data = await response.json();
    const result = data["result"]
    SetExpirationList(result)
    SetExpirationDate(result[0])
  }

  async function get_options_data (ticker, date, options_type) {
    
    let request_url = `http://${API_URL}/options/get_options_data_api`;
    const response = await fetch(request_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ticker: ticker,
        date: date,
        options_type: options_type
      })
    })
    SetOptionData()
    const data = await response.json();
    const result = JSON.parse(data["result"]) 
    SetOptionData(result)
  }


  async function option_pricing (specs) {
    let request_url = `http://${API_URL}/options/options_pricing`;
    console.log(JSON.stringify(specs))
    const response = await fetch(request_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(specs)
    })
    SetOptionsPrice()
    const data = await response.json();
    const result = JSON.parse(data["result"]) 
    console.log(result)
    SetOptionsPrice(result)
  }


  return (
    <>
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>Get Options Data</CardHeader>
            <CardBody>
              {OptionsDataForm()}
              {OptionsDataTable()}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>Pricing</CardHeader>
            <CardBody>
              {OptionPricing()}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>Greeks Analysis</CardHeader>
            <CardBody>

            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>Combination Strategies</CardHeader>
            <CardBody>

            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
    </>
  );
}

export default OptionsAnalysis;
