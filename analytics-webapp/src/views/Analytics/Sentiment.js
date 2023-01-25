import React, { useEffect, useState } from "react";
import Stock_info_form from "components/Forms/FetchStockData.js";
import {StockPriceChart} from "variables/charts.js" ;
import { SwitchTab } from "components/Switch/ToggleSwitch";
import Csv_reader from "utils/data.js"

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col, CardGroup, ListGroup, ListGroupItem, CardFooter, Table, Button, Label, FormGroup, Input}
 from "reactstrap";

import Form from 'react-bootstrap/Form';

function SentimentAnalysis() {
  const [latest_news_senti, SetLatestNewsSenti] = useState({'Count':['Loading...', 'Loading...', 'Loading...'], 'Score':['Loading...', 'Loading...', 'Loading...']})
  const [ticker, SetTicker] = useState();
  const [ticker_submit, SetTickerSubmit] = useState(false)
  const [stock_news_senti, SetStockNewsSenti] = useState({'Count':['Loading...', 'Loading...', 'Loading...'], 'Score':['Loading...', 'Loading...', 'Loading...']})
  const [twitter_senti, SetTwitterSenti] = useState({'twitter_xlm':['Loading...', 'Loading...', 'Loading...'], 'finbert':['Loading...', 'Loading...', 'Loading...']})
  const [twitter_submit, SetTwitterSubmit] = useState(false)
  const [twitter_specs, SetTwitterSpecs] = useState({"content": null, "hashtag": null, "cashtag": null, "url": null, "from_user": null, "to_user": null, "at_user": null, "city": null, "since": null, "until": null, "within_time": null, "filters": null, "tweets_num": 100})

  const API_URL = process.env.REACT_APP_API_URL

  function get_recent_news_sentiment (latest_news_senti) {
    fetch(`http://${API_URL}/sentiment/get_recent_news_sentiment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(latest_news_senti)
    })
    .then((response) => response.json())
    .then((response) => {
      let result = {}
      result['Count'] = JSON.parse(response['result']['fin_news_result'])
      result['Score'] = JSON.parse(response['result']['finbert_result'])
      console.log(result)
      SetLatestNewsSenti(result)
    })
  }

  async function get_stock_news_sentiment(ticker) {
    await fetch(`http://${API_URL}/sentiment/get_single_stock_news_sentiment/${ticker}`)
    .then((response) => response.json())
    .then((response) => {
      let result = {}
      result['Count'] = JSON.parse(response['result']['fin_news_result'])
      result['Score'] = JSON.parse(response['result']['finbert_result'])
      console.log(result)
      SetStockNewsSenti(result)
    })
  }

  async function get_tweets_sentiment(specs) {
    await fetch(`http://${API_URL}/sentiment/get_tweets_sentiment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(specs)
    })
    .then((response) => response.json())
    .then((response) => {
      let result = {}
      result['twitter_xlm'] = JSON.parse(response['result']['twitter_xlm'])
      result['finbert'] = JSON.parse(response['result']['finbert'])
      console.log(result)
      SetTwitterSenti(result)
    })
  }

  function latest90() {
    console.log(latest_news_senti)
    return(
          <Card className="analysis">
            <CardHeader>
              <CardTitle tag="h5">Latest 90 News Headlines Sentiment</CardTitle>
                <CardGroup>
                  <Card>
                    <Table striped>
                      <thead>
                        <tr>
                          <th>Score</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope='row'>
                            Positive
                          </th>
                          <td>
                            {latest_news_senti['Score'][0]}
                          </td>
                        </tr>
                        <tr>
                          <th scope='row'>
                            Neutral
                          </th>
                          <td>
                            {latest_news_senti['Score'][2]}
                          </td>
                        </tr>
                        <tr>
                        <th scope='row'>
                          Negative
                        </th>
                        <td>
                          {latest_news_senti['Score'][1]}
                        </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card>
                  <Card>
                    <Table striped>
                      <thead>
                        <tr>
                          <th>Count</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope='row'>
                            Positive Headlines
                          </th>
                          <td>
                            {latest_news_senti['Count'][0]}
                          </td>
                        </tr>
                        <tr>
                          <th scope='row'>
                            Negative Headlines
                          </th>
                          <td>
                            {latest_news_senti['Count'][1]}
                          </td>
                        </tr>
                        <tr>
                        <th scope='row'>
                          Polarity
                        </th>
                        <td>
                          {latest_news_senti['Count'][2]}
                        </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card>
                </CardGroup>
            </CardHeader>
            <CardFooter>

            </CardFooter>
          </Card>
    )
  }

  function stock100() {
    console.log(ticker)

    console.log(stock_news_senti)
    if (ticker_submit) {
      return(
        <CardGroup>
          <Card>
            <Table striped>
              <thead>
                <tr>
                  <th>Score</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope='row'>
                    Positive
                  </th>
                  <td>
                    {stock_news_senti['Score'][0]}
                  </td>
                </tr>
                <tr>
                  <th scope='row'>
                    Neutral
                  </th>
                  <td>
                    {stock_news_senti['Score'][2]}
                  </td>
                </tr>
                <tr>
                <th scope='row'>
                  Negative
                </th>
                <td>
                  {stock_news_senti['Score'][1]}
                </td>
                </tr>
              </tbody>
            </Table>
          </Card>
          <Card>
            <Table striped>
              <thead>
                <tr>
                  <th>Count</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope='row'>
                    Positive Headlines
                  </th>
                  <td>
                    {stock_news_senti['Count'][0]}
                  </td>
                </tr>
                <tr>
                  <th scope='row'>
                    Negative Headlines
                  </th>
                  <td>
                    {stock_news_senti['Count'][1]}
                  </td>
                </tr>
                <tr>
                <th scope='row'>
                  Polarity
                </th>
                <td>
                  {stock_news_senti['Count'][2]}
                </td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </CardGroup>
      )
    }
  }

  function tweet() {
    console.log(twitter_senti)
    if (twitter_submit) {
      return(
        <CardGroup>
          <Card>
            <Table striped>
              <thead>
                <tr>
                  <th>Twitter-XLM-roBERTa-base Score</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope='row'>
                    Positive
                  </th>
                  <td>
                    {twitter_senti['twitter_xlm'][0]}
                  </td>
                </tr>
                <tr>
                  <th scope='row'>
                    Neutral
                  </th>
                  <td>
                    {twitter_senti['twitter_xlm'][2]}
                  </td>
                </tr>
                <tr>
                <th scope='row'>
                  Negative
                </th>
                <td>
                  {twitter_senti['twitter_xlm'][1]}
                </td>
                </tr>
              </tbody>
            </Table>
          </Card>
          <Card>
            <Table striped>
              <thead>
                <tr>
                  <th>Finbert Score</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope='row'>
                    Positive
                  </th>
                  <td>
                    {twitter_senti['finbert'][0]}
                  </td>
                </tr>
                <tr>
                  <th scope='row'>
                    Neutral
                  </th>
                  <td>
                    {twitter_senti['finbert'][1]}
                  </td>
                </tr>
                <tr>
                <th scope='row'>
                  Negative
                </th>
                <td>
                  {twitter_senti['finbert'][2]}
                </td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </CardGroup>
      )
    }
  }

  function StockForm() {
    return (
      <div class="flexbox-container">
      <Form onSubmit={(e) => {e.preventDefault(); 
        SetStockNewsSenti({'Count':['Loading...', 'Loading...', 'Loading...'], 'Score':['Loading...', 'Loading...', 'Loading...']})
        SetTickerSubmit(true); 
        get_stock_news_sentiment(ticker)}}>
        <Label className="mr-sm-2">Ticker</Label>
        <Input type="text" onChange={(e) => {SetTicker(e.target.value)}} placeholder="eg. AAPL"/>
        <Button>Search</Button>
      </Form>
      </div>   
    )
  }

  function TwitterForm() {
    function handleOnChange(e) {
      SetTwitterSpecs((prevState) => ({
        ...prevState,
          [e.target.name]: e.target.value
      }))
    }

    return (
      <div>
        <Form inline onSubmit={(e) => {e.preventDefault(); 
          SetTwitterSenti({'twitter_xlm':['Loading...', 'Loading...', 'Loading...'], 'finbert':['Loading...', 'Loading...', 'Loading...']}); 
          SetTwitterSubmit(true);
          get_tweets_sentiment(twitter_specs)}}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label className="mr-sm-2">Keywords</Label>
            <Input type="text" name="content" onChange={handleOnChange}/>
          </FormGroup>
          <Row>
          <Col md={6}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label className="mr-sm-2">Hashtags</Label>
            <Input type="text" name="hashtag" onChange={handleOnChange} placeholder="eg. #stock"/>
          </FormGroup>
          </Col>
          <Col md={6}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label className="mr-sm-2">Cashtags</Label>
            <Input type="text" name="cashtag" onChange={handleOnChange} placeholder="eg. $AAPL"/>
          </FormGroup>
          </Col>
          </Row>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label className="mr-sm-2">Urls</Label>
            <Input type="url" name="url" onChange={handleOnChange} placeholder="eg. google.com"/>
          </FormGroup>
          <Row>
          <Col md={4}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label className="mr-sm-2">From (User)</Label>
            <Input type="text" name="from_user" onChange={handleOnChange}/>
          </FormGroup>
          </Col>
          <Col md={4}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label className="mr-sm-2">To (User)</Label>
            <Input type="text" name="to_user" onChange={handleOnChange}/>
          </FormGroup>
          </Col>
          <Col md={4}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label className="mr-sm-2">@ (Users)</Label>
            <Input type="text" name="at_user" onChange={handleOnChange} placeholder="eg. @user"/>
          </FormGroup>
          </Col>
          </Row>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label className="mr-sm-2">City</Label>
            <Input type="text" name="city" onChange={handleOnChange} placeholder="'me' if near where you are"/>
          </FormGroup>
          <Row>
          <Col md={3}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label className="mr-sm-2">Since</Label>
            <Input type="date" name="since" onChange={handleOnChange} placeholder="date placeholder"/>
          </FormGroup>
          </Col>
          <Col md={3}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label className="mr-sm-2">Until</Label>
            <Input type="date" name="until" onChange={handleOnChange} placeholder="date placeholder"/>
          </FormGroup>
          </Col>
          <Col md={6}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label className="mr-sm-2">Within_time</Label>
            <Input type="text" name="within_time" onChange={handleOnChange} placeholder="eg. 1d, or 5h ,or 10m, or 30s"/>
          </FormGroup>
          </Col>
          </Row>
          <Button>Search</Button>
        </Form>
      </div>
    )
  }

  function stock_news() {
    return (
      <Card className="analysis">
        <CardHeader>
        <CardTitle tag="h5">Single Stock Latest 100 News Headlines Sentiment</CardTitle> 
          {StockForm()}
        </CardHeader>
        <CardBody>
          {stock100()}
        </CardBody>
      </Card>
    )
  }

  function twitter() {
    return (
      <Card className="analysis">
        <CardHeader>
          <CardTitle tag="h5">Twitter</CardTitle>
        </CardHeader>
        <CardBody>
          {TwitterForm()}
          {tweet()}
        </CardBody>
      </Card>
    )
  }

  get_recent_news_sentiment(latest_news_senti)
  
  return(
    <>
      <div className="content">
      <Row>
        <Col md="12">
          {latest90()}
          {stock_news()}
          {twitter()}
        </Col>
      </Row>
      </div>
    </>
  )
}

export default SentimentAnalysis;
