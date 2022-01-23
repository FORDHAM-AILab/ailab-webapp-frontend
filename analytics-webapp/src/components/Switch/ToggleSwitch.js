import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import classnames from 'classnames';

import {
  Row, Col,
  Button,
  CardHeader,
  CardTitle,
  Card,
  CardBody,
  Progress,
  TabContent,
  TabPane,
} from 'reactstrap';
import Form from 'react-bootstrap/Form';
import Stock_info_form from "components/Forms/FetchStockData.js"


export function SwitchTab({Component1, Component2, button_name1, button_name2}) {
  const [active_state, setActive_state] = useState('0')

  return (
    <>
          <div className="btn-actions-pane-right">
              <Button outline
                      className={"border-0 btn-pill btn-wide btn-transition " + classnames({active: active_state === '0'})}
                      color="primary" onClick={() => {
                  setActive_state('0');
              }}>{button_name1}</Button>
              <Button outline
                      className={"ml-1 btn-pill btn-wide border-0 btn-transition " + classnames({active: active_state === '1'})}
                      color="primary" onClick={() => {
                  setActive_state('1')
              }}>{button_name2}</Button>
          </div>
        <TabContent activeTab={active_state}>
          <TabPane tabId="0">
              <CardBody className="pt-2">
                <div class="flexbox-container">
                  {Component1}
                </div>
              </CardBody>
          </TabPane>
        </TabContent>
        <TabContent activeTab={active_state}>
          <TabPane tabId="1">
              <CardBody className="pt-2">
                {Component2}           
              </CardBody>
          </TabPane>
        </TabContent>
    </>
  );
}

