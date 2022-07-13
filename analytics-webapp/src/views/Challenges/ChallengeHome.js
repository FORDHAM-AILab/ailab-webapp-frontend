import React, { useEffect, useState } from "react";
import DynamicTable from "components/Tables/table";
// react plugin used to create charts
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import { Line, Pie } from "react-chartjs-2";
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

function ChallengeHome (){
    const API_URL = process.env.REACT_APP_API_URL
    return (
        <div className="content">
            <Col md="12">
            <Card>
                <CardHeader>
                <CardTitle>
                    <CardTitle tag="h4">Portfolio Management</CardTitle>
                </CardTitle>
                </CardHeader>
                <hr/>
                <CardBody>
                    <p>
                    A portfolio management game where participants can practice their trading skills on live market data. 
                    <br/>
                    Currently supported asset types: Stock
                    </p>
                <Col >
                <Row >
                
                <NavLink to="/admin/challenges/challengepm">
                    Go
                </NavLink>
                </Row>
                </Col>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle>
                    <CardTitle tag="h4">Foo</CardTitle>
                </CardTitle>
                </CardHeader>
                <hr/>
                <CardBody>
                    <p>
                    Some intro
                    <br/>
                    Some other intro
                    </p>
                <Col >
                <Row >
                
                <NavLink to="/admin/challenges/challengepm">
                    Go
                </NavLink>
                </Row>
                <Row>
                </Row>
                </Col>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle>
                    <CardTitle tag="h4">Feeling Creative..?</CardTitle>
                </CardTitle>
                </CardHeader>
                <hr/>
                <CardBody>
                    <p>
                    Propose your own challenge!
                    </p>
                <Col >
                <Row>
                    <Button>Propose Challenge</Button>
                </Row>
                </Col>
                </CardBody>
            </Card>
            </Col>
        </div>
    );
}

export default ChallengeHome