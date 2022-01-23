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
import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

function OptionsAnalysis() {
  return (
    <>
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>Basics</CardHeader>
            <CardBody>

            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>Pricing</CardHeader>
            <CardBody>

            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>Greeks Analysis</CardHeader>
            <CardBody>

            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
    </>
  );
}

export default OptionsAnalysis;
