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
import Home from "views/Home.js";
import SentimentAnalysis from "views/Sentiment.js";
import PortfolioAnalysis from "views/Portfolio.js";
import StockAnalysis from "views/Stock.js";
import OptionsAnalysis from "views/Options.js";
import Settings from "views/Settings.js";
import UserPage from "views/User.js";



var routes = [
  {
    path: "/home",
    name: "Home",
    //icon: "nc-icon nc-globe",
    component: Home,
    layout: "/admin",
  },
  { 
    path: "/portfolio",
    name: "Portfolio Analysis",
    //icon: "nc-icon nc-diamond",
    component: PortfolioAnalysis,
    layout: "/admin",
  },

  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "nc-icon nc-single-02",
  //   component: UserPage,
  //   layout: "/admin",
  // },
  {
    path: "/stock",
    name: "Stock Analysis",
    //icon: "nc-icon nc-tile-56",
    component: StockAnalysis,
    layout: "/admin",
  },
  {
    path: "/options",
    name: "Options Analysis",
    //icon: "nc-icon nc-caps-small",
    component: OptionsAnalysis,
    layout: "/admin",
  },
  {
    path: "/sentiment",
    name: "Sentiment Analysis",
    //icon: "nc-icon nc-bell-55",
    component: SentimentAnalysis,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Settings",
    //icon: "nc-icon nc-settings-gear-65",
    component: Settings,
    layout: "/admin",
  },
];
export default routes;
