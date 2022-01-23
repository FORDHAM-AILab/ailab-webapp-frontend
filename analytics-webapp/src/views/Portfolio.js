import React, { useEffect, useState } from "react";
import Stock_info_form from "components/Forms/FetchStockData.js";
import {StockPriceChart} from "variables/charts.js" ;
import { SwitchTab } from "components/Switch/ToggleSwitch";
import Csv_reader from "utils/data.js"
import DynamicTable from "components/Tables/table.js"
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Label, Input, Button, CardSubtitle} from "reactstrap";

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

function PortfolioAnalysis() {

  const [stock_data, setLineData] = useState({});
  const [data, setAnalyticsData] = useState({});
  const [weights, setWeights] = useState('');
  const [port_value, setPortValue] = useState(1)
  const [basic_info, setBasicInfo] = useState({});
  const [var_level, setVarLevel] = useState(5)
  const [var_method, setVarMethod] = useState('Historical VaR');
  const [var_iterations, setVarIteration] = useState();
  const [valueatrisk, setValueatrisk] = useState();
  const [var_alpha, setVarAlpha] = useState();
  //const [file, upLoadFile] = useState();

  // function handleFileUpload(event) {
  //   upLoadFile(event.target.files[0])
  // }

  function chart_data_parser(data){
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
    else{
      labels = [...Array(Object.keys(data).length).keys()];
    }
    for (let i = 0; i < Object.keys(data).length; i ++){
      let data_dict = {
        label:Object.keys(data)[i],
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 3,
        tension: 0.4,
        fill: false,
        data: data[Object.keys(data)[i]]};
      dataset.push(data_dict)
    };

    const line_chart_data = {labels: labels, datasets: dataset};
    return line_chart_data;
  }



  function handleOnComplete (data) {
    let parsed_data = {};
    for (let i = 0; i < data["data"].length; i++){
      if (i ==0){
        for (let j = 0; j < data["data"][0].length; j++){
          parsed_data[data["data"][0][j]]=[];
        }
      }
      else{
        for (let j = 0; j < data["data"][i].length; j++){
          parsed_data[data["data"][0][j]].push(data["data"][i][j]);
        }
      }
    }
    setBasicInfo({});
    setLineData(chart_data_parser(parsed_data));
    setAnalyticsData(parsed_data);    
  }


  function handleOnRemove () {
    setLineData({});
    setAnalyticsData({});
    setBasicInfo({});
    setValueatrisk()
  }


  function EnterSpecs (){
    function onChange (e) {
      setWeights(e.target.value);
    }

    function onChangePortValue (e) {
      setPortValue(e.target.value);
    }

    function onSubmit (e) {
      e.preventDefault();
      console.log(port_value);
      const weights_array = weights.split(",").map(Number);
      get_basic_info(data, weights_array, port_value);
    }
    return (
      <Card>
        <CardHeader>Enter Specifications</CardHeader>
        <CardBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label>Portfolio value (Default 1)</Label>
              <Input onChange={onChangePortValue}>1</Input>
              <Label>Weights (Leave blank for even weights)</Label>
              <Input placeholder="e.g. 0.2, 0.2, 0.6" onChange={onChange}/>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </CardBody>
      </Card>

    )
  }



  function BasicInfoCard() {
    console.log(basic_info);
    if ((basic_info != null) && (Object.keys(basic_info).length > 0)){
      return (
        <>
          <Card className="analysis">
            <CardHeader>
              <CardTitle tag="h5">Basic statistics</CardTitle>
              <p className="card-category">
                Tickers: {tickers}
              </p>
            </CardHeader>
            <CardBody className="basic_info">
              <CardSubtitle>Return Statistics</CardSubtitle>
              <DynamicTable data={basic_info} />

            </CardBody>
          </Card>
        </>
      )
    }
    else {
      return (<></>)
    }
  }


  function VaRForm() {

    function onClick(e){
      setVarMethod(e.target.value)
    }

    function onChangeLevel(e){
      setVarLevel(e.target.value);
    }

    function IterationsInput (){
      function onChange (e) {
        setVarIteration(e.target.value);
      }

      if (var_method === "Monte Carlo VaR"){
        return (
          <FormGroup>
            <Label>Number of iterations for Monte Carlo Simulation</Label>
            <Input type="number" onChange={onChange}/>
          </FormGroup>
        )
      }
      else {
        return (<></>)
      }
    }

    function DecayInput() {
      function onChange(e) {
        setVarAlpha(e.target.value);
      }

      if (var_method === "Parametric VaR"){
        return (
          <FormGroup>
            <Label>Set decay factor for EW-VaR (Leave blank for simple P-VaR)</Label>
            <Input type="text" onChange={onChange}/>
          </FormGroup>
        )
      }
      else{
        return (<></>)
      }
    }

    function onSubmit(e){
      e.preventDefault();
      console.log(Number(var_alpha));
      calc_valueatrisk(data, var_method, weights, Number(var_level), Number(var_iterations), Number(var_alpha), port_value); 
    }

    return (
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>Select Calculation Method</Label>
          <Input type="select" name="select" onChange={onClick}>
            <option>Historical VaR</option>
            <option>Parametric VaR</option>
            <option>Monte Carlo VaR</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>
            Enter level
          </Label>
          <Input type="text" onChange={onChangeLevel}>
          </Input>
        </FormGroup>
        {IterationsInput()}
        {DecayInput()}
        <Button>Calculate</Button>
      </Form>
    )
  }

  function ShowVarResult() {
    console.log(valueatrisk);
    if (valueatrisk != null) {
      console.log('ok')
      return (
        <p>Result {valueatrisk}</p>
      )
    }
  }


  async function fetch_data (tickers, start_date, end_date) {
    
    let request_url = `http://localhost:8888/data/load_hist_stock_price/${start_date}/${end_date}?`;
    const ticker_list = tickers.split(',').map(function(item){
      return item.trim();
    })
    for (let i = 0; i < ticker_list.length; i++){
      if (i == 0){
        request_url += `q=${ticker_list[i]}`;
      }
      else{
        request_url += `&q=${ticker_list[i]}`;
      }
      
    };
    const response = await fetch(request_url);
    const data = await response.json();
    setBasicInfo({})
    setLineData(chart_data_parser(data));
    setAnalyticsData(data);
  }

  async function get_basic_info(data, weights, port_value) {
    const response = await fetch('http://localhost:8888/portfolio_analysis/get_basic_info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: data,
        weights: weights,
        port_value: port_value
      })
    })

    const result = await response.json();
    const parsed = JSON.parse(result["result"])
    setBasicInfo(parsed);
    console.log(parsed);
    return parsed
  }

  async function calc_valueatrisk(data, method, weights, var_level, var_iterations, var_alpha, port_value){
    const result = fetch('http://localhost:8888/portfolio_analysis/valueatrisk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        weights: weights,
        method: method,
        data: data,
        level: var_level,
        n: var_iterations,
        alpha: var_alpha,
        port_value: port_value
      })
    }).then((response) => response.json()).then(
      (responseJSON) => {setValueatrisk(responseJSON["result"]);
      console.log(responseJSON["result"])}
    )
  }
  
  async function calc_sharpe_ratio(data, rf){
    const response = await fetch('http://localhost:8888/portfolio_analysis/sharpe_ratio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rf: rf,
        data: data
      })
    })

    const result = await response.json();
    const parsed = JSON.parse(result["result"])
    return parsed
  }





  const tickers = Object.keys(data).filter(item => item !== 'date').join(", ");

  const stock_info_form = <Stock_info_form fetch_data={fetch_data}/>;
  const file_upload = <Csv_reader handleOnComplete={handleOnComplete} handleOnRemove={handleOnRemove}/>;
  //TODO: categorize analysis: option -> options, filter -> filters
  return (
    <>
      <div className="content">
      <Row>
        <Col md="12">
          <Card>  
            <CardHeader>
                  <CardTitle tag="h5">Get Data</CardTitle>
            </CardHeader>
            <CardBody>
              <SwitchTab Component1 = {stock_info_form} Component2 = {file_upload} button_name1 = "Fetch Data" button_name2 = "Upload File"/>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
            <Card>
              <CardBody>
                <StockPriceChart stock_data={stock_data} />
              </CardBody>
            </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          {EnterSpecs()}
        </Col>
      </Row>
      <Row>
        <Col md="12">
          {BasicInfoCard()}
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card className="analysis">
            <CardHeader>
              <CardTitle tag="h5">PCA Analysis</CardTitle>
              <p className="card-category">
                Tickers: {tickers}
              </p>
            </CardHeader>
            <CardBody className="PCA">
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card className="analysis">
            <CardHeader>
              <CardTitle tag="h5">Optimization</CardTitle>
              <p className="card-category">
                Tickers: {tickers}
              </p>
            </CardHeader>
            <CardBody className="PCA">
            </CardBody>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md="12">
          <Card className="analysis">
            <CardHeader>
              <CardTitle tag="h5">VaR Analysis</CardTitle>
              <p className="card-category">
                Tickers: {tickers}
              </p>
            </CardHeader>
            <CardBody className="PCA">
              {VaRForm()}
              {ShowVarResult()}
            </CardBody>
          </Card>
        </Col>
      </Row>
      </div>
    </>
  );
}

export default PortfolioAnalysis;
