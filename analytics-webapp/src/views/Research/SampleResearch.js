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
import React, { useState } from "react";
import DynamicTable from "components/Tables/table";
import StockChart from 'components/Charts/StockChart';
import {TypeChooser} from "react-stockcharts/lib/helper";
import { timeParse } from "d3-time-format";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button
} from "reactstrap";

import Form from 'react-bootstrap/Form';

function ResearchInfoSample() {
  return (
    <>
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
                <CardTitle tag="h6">Title</CardTitle>
            </CardHeader>
            <CardBody>
                <CardTitle tag="h6">Abstract</CardTitle>
                <p>descriptions...</p> <br/>
                <CardTitle tag="h6">Procedure</CardTitle>
                <p>descriptions...</p>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader tag="h6">Result</CardHeader>
            <CardBody>
              Some results and performance stats and graphs <br/>
              <br/>
              <a href="#">Code</a> <br/>
              <a href="#">Full PDF</a><br/>
              <a href='#'>Citation</a>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
    </>
  );
}

export default ResearchInfoSample;
