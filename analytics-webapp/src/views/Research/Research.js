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
  Button,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import Form from 'react-bootstrap/Form';

function ResearchHome() {
  const [ticker, setTicker] = useState('')
  const [analysis_info, setAnalysisInfo] = useState()
  const [stock_price_full_data, setStockPriceFullData] = useState([])


  return (
    <>
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
              <CardHeader>By Faculty</CardHeader>
            <CardBody>
                <li>
                        <a href="#">Placeholder1</a>
                </li>
                <li>
                        <a href="#">Placeholder2</a>
                </li>
                <li>
                        <a href="#">Placeholder3</a>
                </li>

            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
              <CardHeader>By Topics</CardHeader>
            <CardBody>
                <li>
                        <a href="#">Placeholder1</a>
                </li>
                <li>
                        <a href="#">Placeholder2</a>
                </li>
                <li>
                        <a href="#">Placeholder3</a>
                </li>

            </CardBody>
          </Card>
        </Col>
      </Row>

    </div>

    </>
  );
}

export default ResearchHome;
