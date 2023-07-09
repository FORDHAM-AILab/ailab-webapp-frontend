import React, { useEffect, useState } from "react";
import Stock_info_form from "components/Forms/FetchStockData.js";
import {MyChart, chart_data_parser} from "variables/my_chart.js" ;
import { SwitchTab } from "components/Switch/ToggleSwitch";
import Csv_reader from "utils/data.js"
import Select from 'react-select';
import LoadingOverlay from 'react-loading-overlay';
import DynamicTable from "components/Tables/table.js"
import { Alert } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { CSVLink, CSVDownload } from "react-csv";

import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Label, Input, Button, CardSubtitle, CardColumns} from "reactstrap";
// import TSNE from 'tsne-js';


// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

function DataIntegration() {

  const [table_names, SetTableNames] = useState([]);
  const [fermi_table_names, SetFermiTableNames] = useState([]);
  const [selected_tables, SetSelectedTables] = useState([]);
  const [selected_fermi_tables, SetSelectedFermiTables] = useState([]);
  const [start_date, SetStartDate] = useState("")
  const [end_date, SetEndDate] = useState("")
  const [avail_identifiers, SetAvailIdentifiers] = useState([])
  const [avail_joins, SetAvailJoins] = useState([])
  const [identifier_type, SetIdentifierType] = useState("")
  const [identifier_value, SetIdentifierValue] = useState("")
  const [join_types, SetJoinTypes] = useState("")
  const [join_cols, SetJoinCols] = useState({})
  const [table_columns, SetTableColumns] = useState({})
  const [selected_table_cols, SetSelectedTableCols] = useState({}) // what columns to select
  const [limit, SetLimit] = useState(null)
  //TODO: can add more 'where' criterias 
  const [data, SetData] = useState()
  const [chart_data, SetChartData] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [message, setMessage] = useState(); // alert message
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [Query, SetQuery] = useState("");
  const API_URL    = process.env.REACT_APP_API_URL;
  const JOIN_TYPES = ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN"]
  

  async function fetch_available_tables(){
    setIsLoading(true)
    fetch(`${API_URL}/data/data_warehouse/fetch_available_tables`)
    .then((response) => response.json())
    .then((responseData) => {
      setIsLoading(false);
      if (responseData["status_code"] < 400) {
        SetTableNames(responseData["content"])
      }
      else {
        setAlertType('danger')
        setMessage(`Failed. ${responseData['message']}. Detailed message: ${responseData["debug"]}`)
        setIsAlertVisible(true)
      }

      // let filterOptions = result.map((option)=> ({"value":option, "label":option}))
      // SetCDSSpecsList((prevState) => ({
      //   ...prevState,
      //   [param]: filterOptions
      // }))
      
    })
    
  }

  async function fetch_available_fermi_tables(){
    setIsLoading(true)
    fetch(`${API_URL}/data/data_warehouse/fetch_available_fermi_tables`)
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData["status_code"] < 400) {
        SetFermiTableNames(responseData["content"])
      }
      else {
        setAlertType('danger')
        setMessage(`Failed. ${responseData['message']}. Detailed message: ${responseData["debug"]}`)
        setIsAlertVisible(true)
      }

      // let filterOptions = result.map((option)=> ({"value":option, "label":option}))
      // SetCDSSpecsList((prevState) => ({
      //   ...prevState,
      //   [param]: filterOptions
      // }))
      
    })
    
  }

  async function fetch_available_identifiers(){
    setIsLoading(true)
    fetch(`${API_URL}/data/data_warehouse/fetch_available_identifiers`)
    .then((response) => response.json())
    .then((responseData) => {
      setIsLoading(false);
      if (responseData["status_code"] < 400) {
        SetAvailIdentifiers(responseData["content"])
      }
      else {
        setAlertType('danger')
        setMessage(`Failed. ${responseData['message']}. Detailed message: ${responseData["debug"]}`)
        setIsAlertVisible(true)
      }

      // let filterOptions = result.map((option)=> ({"value":option, "label":option}))
      // SetCDSSpecsList((prevState) => ({
      //   ...prevState,
      //   [param]: filterOptions
      // }))
      
    })
    
  }




  async function fetch_available_joins(){
    setIsLoading(true)
    fetch(`${API_URL}/data/data_warehouse/fetch_available_joins`)
    .then((response) => response.json())
    .then((responseData) => {
      setIsLoading(false);
      if (responseData["status_code"] < 400) {
        SetAvailJoins(responseData["content"])
      }
      else {
        setAlertType('danger')
        setMessage(`Failed. ${responseData['message']}. Detailed message: ${responseData["debug"]}`)
        setIsAlertVisible(true)
      }

      // let filterOptions = result.map((option)=> ({"value":option, "label":option}))
      // SetCDSSpecsList((prevState) => ({
      //   ...prevState,
      //   [param]: filterOptions
      // }))
      
    })
    
  }

  useEffect(()=>{
    fetch_available_tables()
    fetch_available_identifiers()
    fetch_available_joins()
    fetch_available_fermi_tables()
  }, [])


  async function get_table_cols(){

    fetch(`${API_URL}/data/data_warehouse/get_table_cols`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"table_columns": selected_tables})
    }).then((response) => response.json())
    .then((responseData) => {
      setIsLoading(false);
      if (responseData["status_code"] < 400) {
        SetTableColumns(responseData["content"])
      }
      else {
        setAlertType('danger')
        setMessage(`Failed. ${responseData['message']}. Detailed message: ${responseData["debug"]}`)
        setIsAlertVisible(true)
      } 
    })
  }


  async function change_selected_cols(){

    for (const [key, value] of Object.entries(selected_table_cols)) {
      if (!(selected_tables.includes(key))){
        const copy_selected_cols = {...selected_table_cols}
        delete copy_selected_cols[key]
        console.log(copy_selected_cols)
        SetSelectedTableCols(copy_selected_cols)
      }
    }
    // also change join_cols

    for (const [key, value] of Object.entries(join_cols)) {
      if (!(selected_tables.includes(key))){
        const copy_selected_cols = {...selected_table_cols}
        delete copy_selected_cols[key]
        SetJoinCols(copy_selected_cols)
      }
    }



  }
    
  
  useEffect(() => {
    get_table_cols()
    change_selected_cols()
  }, [selected_tables]);


  function BaseSelector(handler, isMulti, options, label){
    function handleMultiSelect(e) {
        var l = []
        if (! isMulti){
          l = e['value']
        }
        else{
          for (var i = 0; i < e.length; i++){
            l.push(e[i]['value'])
          }
        }

        handler(l)

    }

      return (
          <div>
              <label>{label}</label>
              <Select
                isMulti={isMulti}
                name="param"
                options={options}
                className="tables-multi-select"
                onChange={handleMultiSelect}
              />
          </div>
      )
  }

  function ColSelector(table_name, string, handler){
    /*
    Column selector for the given table name
    */
    function handleMultiSelect(e) {
        const col_list = e.map((value)=> value["value"])
        handler(prevState => (
          {
            ...prevState,
            [table_name]: col_list
          }))
    }
      return (
          <div>
              <label>{string} {table_name}</label>
              <Select
                isMulti
                name="param"
                options={table_columns[table_name]}
                className="cols-multi-select"
                onChange={handleMultiSelect}
              />
          </div>
      )
  }

  function list_to_row_orient(list_data){
    const columns = Object.keys(list_data);
    var result = [];
    for (var i = 0; i < list_data[columns[0]].length; i++){
      var row = {}
      for (var k = 0; k < columns.length; k++){
        row[columns[k]] = list_data[columns[k]][i]
      }
      result.push(row)
    }
    return result
  }


  function InputForm () {
    return (
      <div>
      <Form  onSubmit={(e) => {e.preventDefault(); SetData({}); get_integrated_data()}}>
          {BaseSelector(SetSelectedTables, true, table_names, 'Select WRDS tables')}
          {BaseSelector(SetSelectedFermiTables, true, fermi_table_names, 'Select FERMI tables')}
          {BaseSelector(SetIdentifierType, false, avail_identifiers, 'Select asset identifier')}
          <Row>
          <Col md={4}>
            <Label>Set asset identifier value</Label>
            <Input type="string" value={identifier_value} onChange={(e)=> {SetIdentifierValue(e.target.value)}}/>
          </Col>
          
          <Col md={4}>
            <Label>Set Start date (YYYY-MM-DD or YYYYQ1-4)</Label>
            <Input type="string" value={start_date} onChange={(e)=> {SetStartDate(e.target.value)}}/>
          </Col>
          <Col md={4}>
          <Label>Set End date (YYYY-MM-DD or YYYYQ1-4)</Label>
          <Input type="string" value={end_date} onChange={(e)=> {SetEndDate(e.target.value)}}/>
          </Col>
          </Row>
          {BaseSelector(SetJoinTypes, true, avail_joins, 'Select join type')}
          {selected_tables.map(table => (
            ColSelector(table, "Choose columns to be selected for table: ", SetSelectedTableCols)
          ))}
          {selected_tables.map(table => (
            ColSelector(table, "Choose columns to be joined on: ", SetJoinCols)
          ))}
        <Label>Row limit</Label>
        <Input type="number" value={limit} onChange={(e)=> {SetLimit(e.target.value)}}/>
        <Button>Submit</Button>
      </Form>
      </div>
    )
  }

  async function get_integrated_data(){
    setIsLoading(true);
    console.log(selected_table_cols)
    for (const [key, value] of Object.entries(selected_table_cols)){
        selected_table_cols[key] = value.map(function (item) {
        return item.split("--")[0].trim()
      })
    }
    for (const [key, value] of Object.entries(join_cols)){
      join_cols[key] = value.map(function (item) {
      return item.split("--")[0].trim()
    })
  }
    const result = fetch(`${API_URL}/data/data_warehouse/get_integrated_data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"table_names": selected_tables,
                              "start_date" : start_date,
                              "end_date"   : end_date,
                              "join_types"  : join_types,
                              "table_columns": selected_table_cols,
                              "identifier_type": identifier_type,
                              "identifier_value": identifier_value,
                              "join_cols": join_cols,
                              "limit": limit
                            })
      }).then((response) => response.json()).then(
        (responseJSON) => {
          setIsLoading(false);
          if (responseJSON["status_code"] < 400){
            console.log(responseJSON["content"])
            SetData(list_to_row_orient(responseJSON["content"])); 
            SetChartData(responseJSON["content"]);
          }
          else{
            SetData(null)
            SetChartData(null)
            setAlertType('danger')
            //setMessage(`Failed. ${responseJSON['message']}. Detailed message: ${responseJSON["debug"]}`)
            setMessage(`Failed. ${responseJSON['message']}`)
            setIsAlertVisible(true)
          }
          }
      )
  }


  async function run_select_query(){
    const result = fetch(`${API_URL}/data/data_warehouse/run_select_query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"content": Query})
    }).then((response) => response.json()).then(
      (responseJSON) => {
        setIsLoading(false);
        if (responseJSON["status_code"] < 400){
          SetData(list_to_row_orient(responseJSON["content"])); 
          SetChartData(responseJSON["content"]);
          
        }
        else{
          SetData(null)
          SetChartData(null)
          setAlertType('danger')
          //setMessage(`Failed. ${responseJSON['message']}. Detailed message: ${responseJSON["debug"]}`)
          setMessage(`Failed. ${responseJSON['message']}`)
          setIsAlertVisible(true)
        }
        }
    )
  }

  function QueryInput(){
    return (
      <Row>
      <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle>Or enter query manually </CardTitle>
              <CardSubtitle>Note: Only select privilege is granted for data tables only</CardSubtitle>
            </CardHeader>
            <CardBody>
              <Input type="textarea" name="text" onChange={(e)=>{SetQuery(e.target.value)}}/>
              <Button>Submit</Button>
            </CardBody>
          </Card>
      </Col>
    </Row>
    )
  }

  function DataChart(){
    if (chart_data != null && chart_data != undefined ) {
      if (chart_data.length >0 || Object.keys(chart_data).length > 0){
        return (
          <Row>
            <Col md="12">
                <Card>
                <CardHeader>
              <CardTitle tag='h5'>Visualization</CardTitle>  
              
            </CardHeader>
                  <CardBody>
                    <MyChart chartdata={chart_data_parser(chart_data)} />
                  </CardBody>
                </Card>
            </Col>
          </Row>
        )
      }
      else{
        return (<div>No data found</div>)
      }
    }

  }


  function DataTable () {
    const style = {
      maxHeight: `400px`,
      //maxWidth: `6in`,
      overflowY: 'auto',
      overflowX: 'auto'
    };
    
    if (data != null && data != undefined){
      
      if (data.length === 0 || Object.keys(data).length == 0){
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
            <DynamicTable data={data}/>
          </div>
          <CSVLink data={data}>Download</CSVLink>
          </div>
        )
      }

    }
    else {
      return (
        <></>
      )
    }
  }

  return (
    <>
            
    <LoadingOverlay 
    active={isLoading}
    spinner
    text='Loading'
    >
    <div className="content">
      <div style={{ position: "fixed", top: 0, left: 259, right: 0, zIndex: 2000 }}>
          <Alert color={alertType} isOpen={isAlertVisible} toggle={() => setIsAlertVisible(false)}>
              {message}
          </Alert>
      </div>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag='h5'>Query helper</CardTitle>
              </CardHeader>
            <CardBody>
              {InputForm()}
            </CardBody>
          </Card>
        </Col>
      </Row>
      {QueryInput()}
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag='h5'>Data table</CardTitle>  
              
            </CardHeader>
            <CardBody>
              {DataTable()}
            </CardBody>
          </Card>
        </Col>
      </Row>
      
      
      {DataChart()}
      
    </div>
    </LoadingOverlay>
    </>
  );
  
}

export default DataIntegration;
