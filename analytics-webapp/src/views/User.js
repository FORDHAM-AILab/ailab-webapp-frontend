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
import React, { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveUser, updateUser, clearUser } from "reducers/cache_user";
import { Alert } from 'reactstrap';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";



function User() {
  const API_URL = process.env.REACT_APP_API_URL
  const [userProfile, setUserProfile] = useState()
  const [alertType, setAlertType] = useState(false);
  const [message, setMessage] = useState();
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  var user  = useSelector(state => state.users.user)
  var access_token = useSelector(state => state.users.access_token)
  const dispatch = useDispatch()
  React.useEffect(() => {
    if (user['internal_sub_id'] === undefined){
      window.location = '/admin/home'
    }
    setUserProfile(user)
  }, [])

  useEffect(() => {
    window.setTimeout(() => {
        setIsAlertVisible(false)
    }, 3000)
}, [message])


function onUserFileSubmit(e){
  e.preventDefault()
  console.log(userProfile)
  console.log(user)
  fetch(`${API_URL}/users/update_user_profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": access_token
    },
    credentials: 'include',
    body: JSON.stringify({
      userProfile
    })
  })
  .then(res => res.json())
  .then(
      (result) => {
        if (result['status'] == 0){
            setAlertType('success')
            setMessage(`Update succeed!`)
            setIsAlertVisible(true)
            dispatch(updateUser(userProfile))
          }
          else{
            setAlertType('danger')
            setMessage(`Failed. ${result['message']}`)
            setIsAlertVisible(true)
            console.log(message)
          }
      }
  )
}

  return (
    <>
      <div className="content">
      <div style={{ position: "fixed", top: 0, left: 259, right: 0, zIndex: 2000}}>
                            <Alert color={alertType} isOpen={isAlertVisible} toggle={() => setIsAlertVisible(false)}>
                                {message}
                            </Alert>
                        </div>
        <Row>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img
                  alt="..."
                  src={require("assets/img/damir-bosnjak.jpg").default}
                />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/Enrico-Fermi-Italian-problem-physics-1950.jpeg").default}
                    />
                    <h5 className="title">{user['username']}</h5>
                  </a>
                </div>
                <p className="description text-center">
                  "There are two possible outcomes: if the result <br/>
                  confirms the hypothesis, then you've made a <br/>
                  measurement. If the result is contrary to the <br/>
                  hypothesis, then you've made a discovery."
                </p>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <Col className="ml-auto" lg="3" md="6" xs="6">
                      <h5>
                        99+ <br />
                        <small>Research</small>
                      </h5>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                      <h5>
                        99+ <br />
                        <small>Competitions</small>
                      </h5>
                    </Col>
                    <Col className="mr-auto" lg="3">
                      <h5>
                        1 <br />
                        <small>Rank</small>
                      </h5>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">New Research</CardTitle>
              </CardHeader>
              <CardBody><a href="#">Start</a></CardBody>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">New Dataset</CardTitle>
              </CardHeader>
              <CardBody><a href="#">Upload</a></CardBody>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Edit Profile</CardTitle>
              </CardHeader>
              <CardBody>
              <Form onSubmit={(e) => {onUserFileSubmit(e)}} onChange={(e) => {setUserProfile(prev => ({...prev, [e.target.name]: e.target.value}))}}>
                  <Row>
                    <Col className="pr-1" md="3">
                      <FormGroup >
                        <label>Program</label>
                        <Input
                          defaultValue={user['program'] !== undefined? user['program']: ''}
                          placeholder="e.g. MSQF"
                          type="text"
                          name="program"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="2">
                      <FormGroup >
                        <label>Cohort</label>
                        <Input
                          defaultValue={user['cohort'] !== undefined? user['cohort']: ''}
                          placeholder="e.g. 14"
                          type="text"
                          name="cohort"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          defaultValue={user['username'] !== undefined? user['username']: ''}
                          placeholder="Username"
                          type="text"
                          name="username"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email Address
                        </label>
                        <Input defaultValue={user['email']} type="email" name="email" disabled/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          defaultValue={user['first_name'] !== undefined? user['first_name']: ''}
                          placeholder="First Name"
                          type="text"
                          name="first_name"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          defaultValue={user['last_name'] !== undefined? user['last_name']:''}
                          placeholder="Last Name"
                          type="text"
                          name="last_name"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Area of Interest</label>
                        <Input
                        defaultValue={user['area_of_interest'] !== undefined? user['area_of_interest']: ''}
                          placeholder="anything"
                          type="text"
                          name="area_of_interest"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Update Profile
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">My works</CardTitle>
              </CardHeader>
              <CardBody>
                <CardTitle tag="h6">Research</CardTitle>
                  <li style={{"text-indent": 20}}><a href="#"> Sample 1</a></li>
                  <li style={{"text-indent": 20}}><a href="#"> Sample 2</a></li>
                  <li style={{"text-indent": 20}}><a href="#"> Sample 3</a></li>
                <CardTitle tag="h6">Competitions</CardTitle>
                  <li style={{"text-indent": 20}}><a href="#"> Sample 1</a></li>
                  <li style={{"text-indent": 20}}><a href="#"> Sample 2</a></li>
                  <li style={{"text-indent": 20}}><a href="#"> Sample 3</a></li>
                <CardTitle tag="h6">Datasets</CardTitle>
                  <li style={{"text-indent": 20}}><a href="#"> Sample 1</a></li>
                  <li style={{"text-indent": 20}}><a href="#"> Sample 2</a></li>
                  <li style={{"text-indent": 20}}><a href="#"> Sample 3</a></li>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;
