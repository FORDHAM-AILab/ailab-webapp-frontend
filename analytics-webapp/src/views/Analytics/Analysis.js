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
  Table
} from "reactstrap";

function Analysis (){
    const link_to_doc = <a href="http://localhost:8888/docs">link</a>
    return (
        <div className="content">
            <Col md="12">
            <Card>
                <CardHeader>
                <CardTitle>
                    <CardTitle tag="h4">Sections</CardTitle>
                </CardTitle>
                    <p>To see a full list of functions, please visit this {link_to_doc}</p>
                </CardHeader>
                <CardBody>
                <Col >
                <Row >
                
                <NavLink to="/admin/portfolio">
                    <li>
                    Portfolio Analysis
                    </li>
                </NavLink>
                </Row>
                <Row>
                <NavLink to="/admin/stock">
                    <li>Stock Analysis</li>
                </NavLink>
                </Row>
                <Row>
                <NavLink to="/admin/options">
                    <li>Option Analysis</li>
                </NavLink>
                </Row>
                <Row>
                <NavLink to="/admin/sentiment">
                    <li>Sentiment Analysis</li>
                </NavLink>
                </Row>
                <Row>
                <NavLink to="#">
                    <li>PSO</li>
                </NavLink>
                </Row>
                </Col>
                </CardBody>
            </Card>
            </Col>
        </div>
    );
}

export default Analysis