import React, { useEffect, useState } from "react";

  // core components
  import Button from 'react-bootstrap/Button';
  import Form from 'react-bootstrap/Form';

  const default_stock_tickers = "AAPL, TSLA";

  function Stock_info_form({fetch_data}) {
    const [tickers, setTickers] = useState(default_stock_tickers);
    const [start_date, setStartDate] = useState('2020-01-10');
    const [end_date, setEndDate] = useState('2020-01-20');
  
    useEffect(() => {
      fetch_data(tickers, start_date, end_date)
    }, [])
  
    const handleSubmit = (evt) => {
      evt.preventDefault();
      fetch_data(tickers, start_date, end_date);
    };
    return (
      <>
      <div class="flexbox-container">
        <Form onSubmit = {handleSubmit} className = 'settings'>
          <Form.Group className="mb-3">
            <Form.Label>Tickers</Form.Label>
              <Form.Control 
                name="tickers" type="text" placeholder={default_stock_tickers}              
                value={tickers}
                onChange={e => setTickers(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
              <Form.Control 
                name="start_date"type="text" placeholder="YYYY-MM-DD"               
                value={start_date}
                onChange={e => setStartDate(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
              <Form.Control 
                name="end_date"type="text" placeholder="YYYY-MM-DD"               
                value={end_date}
                onChange={e => setEndDate(e.target.value)}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      </>
    )
  };

  export default Stock_info_form;