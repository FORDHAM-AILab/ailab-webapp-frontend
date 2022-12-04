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
    const API_URL = process.env.REACT_APP_API_URL
    const link_href = `${API_URL}/docs`
    const link_to_doc = <a href={link_href}>link</a>
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
            <Card>
                <CardHeader>
                <CardTitle>
                    <CardTitle tag="h4">Links</CardTitle>
                </CardTitle>
                </CardHeader>
                <CardBody>
                    <Col>
                <Row>
                <NavLink to="#">
                    <li>JupyterHub</li>
                </NavLink>
                </Row>
                <Row>
                <NavLink to="#">
                    <li>Zeppelin</li>
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