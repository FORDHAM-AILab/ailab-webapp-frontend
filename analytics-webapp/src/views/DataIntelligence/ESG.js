import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Row, Col, Label, Input, Form, FormGroup, Button} from "reactstrap";
import DynamicTable from "components/Tables/table";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import AsyncSelect from 'react-select/async';
import { CSVLink, CSVDownload } from "react-csv";
import LoadingOverlay from 'react-loading-overlay';


function ESGView() {
    const [ticker, SetTicker] = useState();
    const [expiration_list, SetExpirationList] = useState([])
    const [expiration_date, SetExpirationDate] = useState()
    const [options_type, SetOptionsType] = useState("")
    const [cds_specs, SetCDSDataSpecs] = useState({"REGION": [], "INDUSTRY": [], "OBLIGATION_ASSETRANK":[], "CREDIT_EVENTS": [], "limit": 100})
    const [cds_specs_list, SetCDSSpecsList] = useState({"REGION": [], "INDUSTRY": [], "OBLIGATION_ASSETRANK":[], "CREDIT_EVENTS": []})
    const [cds_data, SetCDSData] = useState()
    const [data_requested, SetDataRequested] = useState(false)
    const [options_price, SetOptionsPrice] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const API_URL = process.env.REACT_APP_API_URL
  
    async function fetch_cds_param_values(param){
      if (param == 'CREDIT_EVENTS'){
        setIsLoading(true)
      }
      fetch(`${API_URL}/data/data_warehouse/cds_get_unique_val/${param}`)
      .then((response) => response.json())
      .then((responseData) => {
        let result = responseData["result"];
        if ((result == null) || (result == undefined)){
            if (param == 'REGION'){
              if(alert('Error: something is wrong with the database')){}
              else    window.location.reload(); 
            }
            }
        let filterOptions = result.map((option)=> ({"value":option, "label":option}))
        SetCDSSpecsList((prevState) => ({
          ...prevState,
          [param]: filterOptions
        }))
        setIsLoading(false)
      })
      
    }
  
    async function get_cds_data(){
      console.log("Fetching data start")
      const result = fetch(`${API_URL}/data/data_warehouse/get_cds_data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cds_specs)
        }).then((response) => response.json()).then(
          (responseJSON) => {SetCDSData(JSON.parse(responseJSON["result"]));}
        )
    }
  
    async function set_params(){
      Object.keys(cds_specs_list).map((key,index)=>(
        fetch_cds_param_values(key)
    ))
    }
  
  
    useEffect(()=>{
      set_params()
    }, [])
  
    function CDSFilter(param){
      function handleMultiSelect(e) {
          const spec_list = e.map((value)=> value["value"])
          SetCDSDataSpecs(prevState => ({
              ...prevState,
              [param]: spec_list
            }))
      }
        return (
            <div>
                <label>{param}</label>
                <Select
                  isMulti
                  name="param"
                  options={cds_specs_list[param]}
                  className="cds-multi-select"
                  onChange={handleMultiSelect}
                />
            </div>
        )
    }
  
    function CDSDataForm () {
      console.log(cds_specs)
      return (
        <div>
        <Form  onSubmit={(e) => {e.preventDefault(); SetCDSData(null); get_cds_data(); SetDataRequested(true)}}>
          {CDSFilter("REGION")}
          {CDSFilter("INDUSTRY")}
          {CDSFilter("OBLIGATION_ASSETRANK")}
          {CDSFilter("CREDIT_EVENTS")}
          <Label>Row limit</Label>
          <Input type="number" value={cds_specs["limit"]} onChange={(e)=> {SetCDSDataSpecs(prevState=> ({
            ...prevState,
            limit:e.target.value
          }))}}/>
          <Button>Submit</Button>
        </Form>
        </div>
      )
    }
  
    function CDSsDataTable () {
      const style = {
        maxHeight: `400px`,
        //maxWidth: `6in`,
        overflowY: 'auto',
        overflowX: 'auto'
      };
      if (cds_data != null){
        console.log("here")
        if (cds_data.length === 0){
          return (
            <div>
              <p>No data found</p>
            </div>
          )
        }
        else {
          return (
            <div>
            <div style={style}>
              <DynamicTable data={cds_data}/>
            </div>
            <CSVLink data={cds_data}>Download</CSVLink>
            </div>
          )
        }
  
      }
      else {
        if (data_requested){
          return (
            <div>
              <p>Loading Data</p>
            </div>
          )
        }
        else{
          return (
            <></>
          )
        }
  
      }
    }
  
  
  
  
  
  
    return (
      <>
              
      <LoadingOverlay 
      active={isLoading}
      spinner
      text='Loading params...'
      >
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>Get CDS Data</CardHeader>
              <CardBody>
                {CDSDataForm()}
                {CDSsDataTable()}
              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </div>
      </LoadingOverlay>
      </>
    );
  }

export default ESGView