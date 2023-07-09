import React, { useEffect, useState } from "react";
import Stock_info_form from "components/Forms/FetchStockData.js";
import {MyChart} from "variables/my_chart.js" ;
import { SwitchTab } from "components/Switch/ToggleSwitch";
import Csv_reader from "utils/data.js"
import DynamicTable from "components/Tables/table.js"
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Label, Input, Button, CardSubtitle, CardColumns} from "reactstrap";
// import TSNE from 'tsne-js';

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

function PortfolioAnalysis() {

  const [stock_data, setLineData] = useState({});
  const [data, setAnalyticsData] = useState({});
  const [weights, setWeights] = useState('');
  const [basic_info, setBasicInfo] = useState({});
  const [var_level, setVarLevel] = useState(5)
  const [var_iterations, setVarIteration] = useState(500);
  const [valueatrisk, setValueatrisk] = useState();
  const [var_alpha, setVarAlpha] = useState(0);
  const [expected_return, setER] = useState(null);
  const [calculated_weights, setCalculatedWeights] = useState(null)
  const API_URL = process.env.REACT_APP_API_URL
  //const [file, upLoadFile] = useState();

  // function handleFileUpload(event) {
  //   upLoadFile(event.target.files[0])
  // }

  const Classic20 = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5'];


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
        borderColor: Classic20[i],
        tension: 0.4,
        fill: false,
        data: data[Object.keys(data)[i]]};
      dataset.push(data_dict)
    };

    const line_chart_data = {labels: labels, datasets: dataset};
    return line_chart_data;
  }



  function handleOnComplete (data) {
    // handle csv data upload
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


    function onSubmit (e) {
      e.preventDefault();
      const weights_array = weights.split(",").map(Number);
      get_basic_info(data, weights_array);
    }
    return (
      <Card>
        <CardHeader>Enter Specifications</CardHeader>
        <CardBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
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

  // let model = new TSNE({
  //   dim:2,
  //   perplexity: 30,
  //   earlyExaggeration: 4,
  //   learningRate: 100,
  //   nIter:1000,
  //   metric: 'euclidean'
  // })

  // model.init({
  //   data: Object.keys(data).map(function(key){
  //     return data[key];
  //   }),
  //   type: 'dense'
  // })


  function WeightsOptimization() {
    function result (){
      if (calculated_weights != null){
        const result_str = calculated_weights.join(",")
        return (
          <p>Result: {result_str}</p>
        )
      }
      else {
        return (<></>)
      }
    }
    return (
      <div>
      <Form inline onSubmit={(e) => {
        e.preventDefault();
        calc_weights();
      }}>
        <FormGroup>
          <Label>Enter Portfolio expected return</Label>
          <Input value={expected_return} onChange={(e)=>{setER(e.target.value)}}/>
        </FormGroup>
        <Button>Calculate</Button>
      </Form>
      {result()}
      </div>
    )
  }


  function VaRForm() {

    function onSubmit(e){
      e.preventDefault();
      console.log(Number(var_alpha));
      calc_valueatrisk(data, weights, Number(var_level), Number(var_iterations), Number(var_alpha)); 
    }

    return (
      <div>
      <CardSubtitle>Parameters</CardSubtitle>
      <Form onSubmit={onSubmit}>
        
        <FormGroup>
          <Label>
            Enter level
          </Label>
          <Input value={var_level} type="text" onChange={(e)=>{setVarLevel(e.target.value)}}/>
            
        </FormGroup>
        <FormGroup>
            <Label>Set decay factor for EW-VaR (Default 0 for simple P-VaR)</Label>
            <Input value={var_alpha} type="text" onChange={(e) => {setVarAlpha(e.target.value)}}/>
        </FormGroup>
        <FormGroup>
            <Label>Set # of iterations for Monte Carlo VaR</Label>
            <Input value={var_iterations} type="text" onChange={(e) => {setVarIteration(e.target.value)}}/>
        </FormGroup>
        <Button>Calculate</Button>
      </Form>
      </div>
    )
  }

  function ShowVarResult() {
    if (valueatrisk != null) {

      return (
        <div>
          <Row style={{paddingTop:20}}>
            <Col>
          <CardSubtitle>Results:</CardSubtitle>
          </Col>
          </Row>
          <Row>
          {Object.keys(valueatrisk).map((key,index)=>(
            <Col md="4">
              <p key={index}>{key}: {valueatrisk[key]}</p>
            </Col>
          ))}
          </Row>
        </div>
      )
    }
  }



  async function fetch_data (tickers, start_date, end_date) {
    
    let request_url = `${API_URL}/data/load_hist_stock_price/${start_date}/${end_date}?`;
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
    console.log(data)
    setAnalyticsData(data);
  }

  async function get_basic_info(data, weights) {
    const response = await fetch(`${API_URL}/portfolio/get_basic_info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: data,
        weights: weights
      })
    })

    const result = await response.json();
    const parsed = JSON.parse(result["content"])
    setBasicInfo(parsed);
    console.log(parsed);
    return parsed
  }

  async function calc_valueatrisk(data, weights, var_level, var_iterations, var_alpha){
    const result = fetch(`${API_URL}/portfolio/valueatrisk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        weights: weights,
        data: data,
        level: var_level,
        n: var_iterations,
        alpha: var_alpha,
      })
    }).then((response) => response.json()).then(
      (responseJSON) => setValueatrisk(responseJSON["content"])
    )
  }
  
  async function calc_sharpe_ratio(data, rf){
    const response = await fetch(`${API_URL}/portfolio/sharpe_ratio`, {
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


  async function calc_weights(){
    const response = await fetch(`${API_URL}/portfolio/weights_optimization`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: data,
        expected_return: expected_return,
        weights:weights
      })
    })

    const result = await response.json();
    const parsed = result["result"]
    console.log(parsed)
    setCalculatedWeights(parsed)
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
                <MyChart chartdata={stock_data} />
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
              <CardTitle tag="h5">PCA/ICA/NMF etc.</CardTitle>
              <p className="card-category">
                Tickers: {tickers}
              </p>
            </CardHeader>
            <CardBody className="PCA">
              Linear: PCA/ICA, Non-linear: UMAP, T-SNE, autoencoders...
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
              {WeightsOptimization()}
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
