import React, { useEffect, useState } from "react";
import Stock_info_form from "components/Forms/FetchStockData.js";
import {StockPriceChart} from "variables/charts.js" ;
import { SwitchTab } from "components/Switch/ToggleSwitch";
import Csv_reader from "utils/data.js"

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

function SentimentAnalysis() {

  const [stock_data, setLineData] = useState({});
  const [data, setAnalyticsData] = useState({});
  const [file_info, setFileInfo] = useState("No File Uploaded")
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

    console.log(data)
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
    setLineData(chart_data_parser(parsed_data));
    setAnalyticsData(parsed_data);
    setFileInfo(`File shape: ${data["data"].length} x ${data["data"][0].length}`)
  }


  function handleOnRemove () {
    setLineData({});
    setAnalyticsData({})
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
    console.log(request_url);
    const response = await fetch(request_url);
    const data = await response.json();
    console.log(1111);
    
    setLineData(chart_data_parser(data));
    setAnalyticsData(data);
  }
  const tickers = Object.keys(data).filter(item => item !== 'date').join(", ");

  const stock_info_form = <div>Enter text or URL</div>
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
        <Col md="12">
          <Card className="analysis">
            <CardHeader>
              <CardTitle tag="h5">Basic statistics</CardTitle>
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
            </CardBody>
          </Card>
        </Col>
      </Row>
      </div>
    </>
  );
}

export default SentimentAnalysis;
