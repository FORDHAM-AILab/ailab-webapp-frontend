import React, { useEffect, useState,useLayoutEffect } from "react";
import DynamicTable from "components/Tables/table";
// react plugin used to create charts
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import { Line, Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie'
import { useHistory } from 'react-router'
import { saveUser, clearUser } from "reducers/cache_user";
import { Alert } from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';
import { Button as AButton, Form as AForm, Input as AInput, Space as ASpace, Switch} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { CheckOutlined } from '@ant-design/icons';



// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Button,
  Table
} from "reactstrap";
import Form from 'react-bootstrap/Form';

function ChallengePM (){
    const [rank, setRank] = useState();
    const [accountInfo, setAccountInfo] = useState();
    const [transactions, setTransactions] = useState();
    const [positions, setPositions] = useState();
    const [alertType, setAlertType] = useState(false);
    const [message, setMessage] = useState();
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    var access_token = useSelector(state => state.users.access_token)
    const user  = useSelector(state => state.users.user)
    const API_URL = process.env.REACT_APP_API_URL
    const dispatch = useDispatch()
    useEffect(() => {  
        get_rank('net_account_value')
        if ((user !== null) && (user !== undefined)){
            if (Object.keys(user).length > 0){
                get_user_account_info(user['internal_sub_id'])
                get_transactions(user['internal_sub_id'])
                get_positions()
            }
        }

        },[])

    useEffect(() => {
        window.setTimeout(() => {
            setIsAlertVisible(false)
        }, 8000)
    }, [isAlertVisible])

    useLayoutEffect(() => {
        if (isLoading) {
          document.body.style.overflow = "hidden";
          document.body.style.height = "100%";
        }
        if (!isLoading) {
          document.body.style.overflow = "auto";
          document.body.style.height = "auto";
        }
      }, [isLoading]);

    async function get_rank(by){
        fetch(`${API_URL}/game/rm_game/rank_players_rm/${by}`)
        .then(res => res.json())
        .then(
            (result) => {
                
                setRank(result['content'])
            }
        )
    }


    async function get_historical_records(){

        /*
            get historical records for the current user
        */

        fetch(`${API_URL}/game/rm_game/get_historical_records`, {
            method: 'GET',
            // include the following authorization header and credentials: 'include' for APIs that requires
            // user log-in authentication (i.e. that needs to know who that user is)
            headers: {
              'Content-Type': 'application/json',
              "Authorization": access_token
            },
            credentials: 'include'
        })
        .then()
        .then()
        
    }


    async function get_historical_records_all(){
        fetch(`${API_URL}/game/rm_game/get_historical_net_account_value`, {
            method: 'GET',
            // include the following authorization header and credentials: 'include' for APIs that requires
            // user log-in authentication (i.e. that needs to know who that user is)
            headers: {
              'Content-Type': 'application/json',
              "Authorization": access_token
            },
            credentials: 'include'
        })
        .then()
        .then()
        
    }


    async function get_user_account_info(){
        const response = await fetch(`${API_URL}/game/rm_game/get_user_account_info`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": access_token
            },
            credentials: 'include'
          })
      
          const result = await response.json();
          setAccountInfo(result['content'])   
    }


    async function get_transactions(){
        
        const response = fetch(`${API_URL}/game/rm_game/get_transaction_history`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": access_token
            },
            credentials: 'include'
          }).then(
              response => {
                if (response.ok){
                    return response.json()
                }
                else{
                    if (response['statusText'] == 'Unauthorized'){
                        console.log('Unauthorized. Clear user')
                        dispatch(clearUser())
                        setAccountInfo(null)
                        setTransactions(null)
                        setPositions(null)
                }}  
                })
            .then(data => {setTransactions(data['content'])})
            .catch((e) => {console.log(e)})
    }

    async function get_positions(){
        
        const response = fetch(`${API_URL}/game/rm_game/get_user_position`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": access_token
            },
            credentials: 'include'
          }).then(
              response => {
                
                if (response.ok){
                    return response.json()
                }
                else{
                    if (response['statusText'] == 'Unauthorized'){
                        console.log('Unauthorized. Clear user')
                        dispatch(clearUser())
                        setAccountInfo(null)
                        setTransactions(null)
                        setPositions(null)
                }}  
                })
            .then(data => {setPositions(data['content'])})
            .catch((e) => {console.log(e)})
    }

    function Positions(){

        return (<DynamicTable bordered data={positions}></DynamicTable>)
    }

    const pl = 'P&L'

    function Component(){
        if ((user === null) || (user === undefined)){
            return (<p>Log in to view your records</p>)
        }
        
        else if ((accountInfo != null) && (accountInfo != undefined)){
            if (accountInfo === -1){
                return (
                    <div>
                        <div style={{ position: "fixed", top: 0, left: 259, right: 0, zIndex: 2000 }}>
                            <Alert color={alertType} isOpen={isAlertVisible} toggle={() => setIsAlertVisible(false)}>
                                {message}
                            </Alert>
                        </div>
                    <Col md="12">
                            <Card>
                                <CardBody>You have not joined the game yet
                                    <hr/>
                                    <Col>
                                    <Row>
                                        <Button onClick={() => fetch(`${API_URL}/game/rm_game/create_rm_game_user`, {
                                                method: 'POST',
                                                credentials: 'include',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    "Authorization": access_token
                                                }
                                            }).then(
                                                response => {
                                                    
                                                    if (response.ok){
                                                        return response.json()
                                                    }
                                                    else{
                                                        setAlertType('danger')
                                                        setMessage(`Failed. ${response.json()}`)
                                                        setIsAlertVisible(true)
                                                    }
                                                }
                                            ).then(data => {
                                                if (data['status_code'] < 400){
                                                    setAlertType('success')
                                                    setMessage(`You have joined the game successfully!`)
                                                    setIsAlertVisible(true)
                                                    get_user_account_info()
                                                }
                                                else{
                                                    setAlertType('danger')
                                                    setMessage(`Failed. ${data['message']}`)
                                                    setIsAlertVisible(true)
                                                }
                                            })}>Join</Button>
                                        </Row>
                                    </Col>
                                    </CardBody>
                                    
                            </Card>

                    </Col>

                    </div>
                )
            }
            else{
                return (
                    <div >
                        <div style={{ position: "fixed", top: 0, left: 259, right: 0, zIndex: 2000 }}>
                            <Alert color={alertType} isOpen={isAlertVisible} toggle={() => setIsAlertVisible(false)}>
                                {message}
                            </Alert>
                        </div>
                        <Col md="12">
                            
                            <Row>
                                <Col md='12'>
                                    <Card className="card-stats">
                                        <CardHeader>
                                            <CardTitle tag="h5">
                                                Account Summary
                                            </CardTitle>
                                        </CardHeader>
                                        <hr />
                                        <CardBody>
                                            <Row>
                                                <Col md="2" xs="7">
                                                    <div className="numbers">
                                                        <p className="card-category">Net Account Value</p>
                                                        <CardTitle tag="p">{accountInfo['net_account_value']}</CardTitle>
                                                        <p />
                                                    </div>
                                                </Col>

                                                <Col md="4" xs="7">
                                                    <div className="numbers">
                                                        <p className="card-category">Market Value</p>
                                                        <CardTitle tag="p">{accountInfo['market_value']}</CardTitle>
                                                        <p />
                                                    </div>
                                                </Col>
                                                <Col md="4" xs="7">
                                                    <div className="numbers">
                                                        <p className="card-category">Cash Balance</p>
                                                        <CardTitle tag="p">{accountInfo['cash_balance']}</CardTitle>
                                                        <p />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="2" xs="7">
                                                    <div className="numbers">
                                                        <p className="card-category">{pl}</p>
                                                        <CardTitle tag="p">{accountInfo['pl']}</CardTitle>
                                                        <p />
                                                    </div>
                                                </Col>

                                                <Col md="4" xs="7">
                                                    <div className="numbers">
                                                        <p className="card-category">{pl} %</p>
                                                        <CardTitle tag="p">{accountInfo['pl_percent']}</CardTitle>
                                                        <p />
                                                    </div>
                                                </Col>

                                            </Row>

                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Card>
                                <CardHeader>
                                <CardTitle>
                                    <CardTitle tag="h5">My Positions</CardTitle>
                                </CardTitle>
                                </CardHeader>
                                <hr />
                                <CardBody>
                                <Col >
                                    <Row>
                                        {Positions()}
                                    </Row>
                                    <Row>
                                        <NavLink to='/admin/stock'>Go to Stock Analysis</NavLink>
                                    </Row>
                                </Col>
                                </CardBody>
                            </Card>
                            <Row>
                                <Col md="6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle tag="h5">Risk Factors</CardTitle>
                                        </CardHeader>
                                        <CardBody>
                                            <div style={{
                                                        height: '200px',
                                                        //maxWidth: `6in`,
                                                        overflowY: 'auto',
                                                        overflowX: 'auto'
                                                        }}>
                                        <Table>
                                        <tbody>
                                            <tr>
                                                <td>Historical VaR</td>
                                                <td>{accountInfo['hist_var']}</td>
                                            </tr>
                                            <tr>
                                                <td>Parametric VaR</td>
                                                <td>{accountInfo['p_var']}</td>
                                            </tr>
                                            <tr>
                                                <td>Monte Carlo VaR</td>
                                                <td>{accountInfo['monte_carlo_var']}</td>
                                            </tr>
                                        </tbody>
                                        </Table>
                                        </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md="6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle tag="h5">Transaction History</CardTitle>
                                        </CardHeader>
                                        <CardBody>
                                            {Transactions(200)}
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Card>
                                <CardHeader>
                                <CardTitle>
                                    <CardTitle tag="h5">Order Book</CardTitle>
                                </CardTitle>
                                </CardHeader>
                                <CardBody>
                                <Col >
                                    <Row>
                                        {OrderForm()}
                                    </Row>
                                </Col>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardHeader>
                                <CardTitle>
                                    <CardTitle tag="h5">Leaderboard</CardTitle>
                                </CardTitle>
                                </CardHeader>
                                <CardBody>
                                <Col >
                                    <Row>
                                        {Leaderboard(400)}
                                    </Row>
                                    
                                </Col>
                                </CardBody>
                            </Card>
                            
    
                            </Col>
                    </div>
                )
            }
        }


    }

    const onFinish = (values) => {
        console.log('Received values of form:', values);
      };


    function Transactions(height){
        const style = {
            maxHeight: `${height}px`,
            //maxWidth: `6in`,
            overflowY: 'auto',
            overflowX: 'auto'
          };
        if ((transactions != null) && (transactions != undefined)){
            if (transactions.length > 0){
                return (
                    <div style={style}>
                    <DynamicTable bordered height={height} data={transactions}></DynamicTable>
                  </div>
                )
            }
            else{
                return (
                    <p>No transaction history found</p>
                )
            }

        }
    }


    function OrderForm(){
        const handleSubmit = (e) => {
            //e.preventDefault();
            setIsLoading(true)
            // var values = order.filter(v=> v!=null);
            var order_dict ={};
            e = e['orders'];
            // for (var i =0; i < values.length; i++){
            //     if (values[i]['ticker'] in order_dict) order_dict[values[i]['ticker']] += values[i]['quantity'] * values[i]['buy'];
            //     else order_dict[values[i]['ticker']] = values[i]['quantity'] * values[i]['buy'];
            // }
            for (var i =0; i < e.length; i++){
                const buy = e[i]['buy']?1:-1;
                if (e[i]['ticker'] in order_dict) order_dict[e[i]['ticker']] += e[i]['quantity'] * buy;
                else order_dict[e[i]['ticker']] = e[i]['quantity'] * buy;
            }
            console.log(e)
            console.log(order_dict);
            fetch(`${API_URL}/game/rm_game/update_portfolio`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": access_token
            },
            credentials: 'include',
            body: JSON.stringify({
              transactions:order_dict
            })
          })
          .then(res => res.json())
          .then(
              (result) => {
                    console.log(result)
                    setIsLoading(false)
                if (result['status_code'] < 400){
                    setAlertType('success')
                    setMessage(`Transaction succeed!`)
                    setIsAlertVisible(true)
                  }
                  else{
                    setAlertType('danger')
                    setMessage(`Failed. ${result['detail']}`)
                    setIsAlertVisible(true)
                  }
              }
          )
        }
        
        return (
        //     <Form onSubmit = {handleSubmit} className = 'settings'>
        //     <Form.Group className="mb-3">
        //         <Form.Control 
        //           name="order" type="textarea" placeholder='{"AAPL":5, "TSLA":8}'             
        //           value={order}
        //           onChange={e => setOrder(e.target.value)}/>
        //     </Form.Group>


        //     <Button variant="primary" type="submit">
        //       Submit
        //     </Button>
        //   </Form>
            <AForm
                name="dynamic_form_nest_item"
                onFinish={handleSubmit}
                style={{
                maxWidth: 600,
                }}
                autoComplete="off"
            >
                <AForm.List name="orders">
                {(fields, { add, remove }) => (
                    <>
                    {fields.map(({ key, name, ...restField }) => (
                        <ASpace
                        key={key}
                        style={{
                            display: 'flex',
                            marginBottom: 8,
                        }}
                        align="baseline"
                        >
                        <AForm.Item
                        {...restField}
                        name={[name, 'ticker']}
                        rules={[
                        {
                            required: true,
                            message: 'Missing ticker symbol',
                        },
                        ]}
                        >
                            <AInput placeholder="Ticker" />
                        </AForm.Item>
                        <AForm.Item
                            {...restField}
                            name={[name, 'quantity']}
                            rules={[
                            {
                                required: true,
                                message: 'Missing quantity',
                            },
                            ]}
                        >
                            <AInput placeholder="Quantity" />
                        </AForm.Item>
                        <AForm.Item
                            {...restField}
                            initialValue
                            name={[name, 'buy']}>
                            <Switch checkedChildren="Buy" unCheckedChildren="Sell" defaultChecked={true}/>
                        </AForm.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                        </ASpace>
                    ))}
                    <ASpace align="baseline">


                    <AForm.Item>
                        <AButton type="primary" htmlType="submit">
                            Execute
                        </AButton>
                        </AForm.Item>
                        <AForm.Item>
                        <AButton type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add transaction
                        </AButton>
                    </AForm.Item>
                    </ASpace>

                    </>
                )}
                </AForm.List>

            </AForm>
        )
    }


    function Leaderboard(height) {
        const style = {
          maxHeight: `${height}px`,
          //maxWidth: `6in`,
          overflowY: 'auto',
          overflowX: 'auto'
        };
    
        if (rank != null) {
          return (
            <div style={style}>
              <DynamicTable bordered height={height} data={rank}></DynamicTable>
            </div>
          )
        }
      } 


    return (
        <div className="content" >
            
            <LoadingOverlay styles={{
                _loading_overlay_wrapper: {position: 'fixed'},
                _loading_overlay_overlay: {position: 'fixed'},
                _loading_overlay_content: {position: 'fixed'},
                _loading_overlay_spinner: {position: 'fixed'}
            }}
            active={isLoading}
            spinner
            text='Executing...'
            >
            {Component()}
            </LoadingOverlay>
        </div>
    );
}

export default ChallengePM