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
import SentimentAnalysis from "views/Analytics/Sentiment.js";
import PortfolioAnalysis from "views/Analytics/Portfolio.js";
import StockAnalysis from "views/Analytics/Stock.js";
import OptionsAnalysis from "views/Analytics/Options.js";
import Settings from "views/Settings.js";
import Analysis from "views/Analytics/Analysis.js"
import StockDataIntelligence from "views/DataIntelligence/DataStock.js"
import DataDashboard  from "views/DataIntelligence/DataHome";
import StockFullAnalytics from "views/Analytics/StockFullAnalytics";
import CDSView from "views/DataIntelligence/CDS.js";
import ESGView from "views/DataIntelligence/ESG.js";
import ResearchHome from "views/Research/Research.js";
import DataInfoSample from "views/Data/DataInfoSample";
import ResearchInfoSample from "views/Research/SampleResearch";
import User from "views/User";
import ChallengeHome from "views/Challenges/ChallengeHome";
import ChallengePM from "views/Challenges/ChallengePM";

var sidebar_routes = [  
  {
    path: "/home",
    name: "Home",
    //icon: "nc-icon nc-globe",
    component: Home,
    layout: "/admin"
  },
  { 
    path: "/data",
    name: "Data Intelligence",
    //icon: "nc-icon nc-diamond",
    layout: "/admin",
    component: DataDashboard
  },
  { 
    path: "/analysis",
    name: "Analytics",
    //icon: "nc-icon nc-diamond",
    component: Analysis,
    layout: "/admin"
  },
  { 
    path: "/research",
    name: "Research",
    //icon: "nc-icon nc-diamond",
    component: ResearchHome,
    layout: "/admin"
  },
  { 
    path: "/challenges",
    name: "Challenges",
    //icon: "nc-icon nc-diamond",
    component: ChallengeHome,
    layout: "/admin"
  },
  {
    path: "/settings",
    name: "Settings",
    //icon: "nc-icon nc-settings-gear-65",
    component: Settings,
    layout: "/admin"
  },]

var routes = [
  {
    path: "/home",
    name: "Home",
    //icon: "nc-icon nc-globe",
    component: Home,
    layout: "/admin",
  },
  { 
    path: "/data",
    name: "Dashboard",
    //icon: "nc-icon nc-diamond",
    layout: "/admin",
    component: DataDashboard
  },
  { 
    path: "/data/data_warehouse/cds",
    name: "CDS",
    //icon: "nc-icon nc-diamond",
    layout: "/admin",
    component: CDSView
  },
  { 
    path: "/data/data_warehouse/esg",
    name: "ESG",
    //icon: "nc-icon nc-diamond",
    layout: "/admin",
    component: ESGView  
  },

  { 
    path: "/analysis",
    name: "Analytics",
    //icon: "nc-icon nc-diamond",
    component: Analysis,
    layout: "/admin"
  },
  { 
    path: "/portfolio",
    name: "Portfolio Analytics",
    //icon: "nc-icon nc-diamond",
    component: PortfolioAnalysis,
    layout: "/admin"
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
    name: "Stock Analytics",
    //icon: "nc-icon nc-tile-56",
    component: StockAnalysis,
    layout: "/admin",
  },
  {
    path: "/stock/full_analytics",
    name: "Detail Analytics",
    //icon: "nc-icon nc-tile-56",
    component: StockFullAnalytics,
    layout: "/admin",
  },
  {
    path: "/data/sampledata",
    name: "Dataset_name",
    //icon: "nc-icon nc-tile-56",
    component: DataInfoSample,
    layout: "/admin",
  },
  
  {
    path: "/options",
    name: "Options Analytics",
    //icon: "nc-icon nc-caps-small",
    component: OptionsAnalysis,
    layout: "/admin"
  },
  {
    path: "/sentiment",
    name: "Sentiment Analytics",
    //icon: "nc-icon nc-bell-55",
    component: SentimentAnalysis,
    layout: "/admin"
  },
  { 
    path: "/research",
    name: "Research",
    //icon: "nc-icon nc-diamond",
    component: ResearchHome,
    layout: "/admin"
  },
  { 
    path: "/research/samplepage",
    name: "Research name",
    //icon: "nc-icon nc-diamond",
    component: ResearchInfoSample,
    layout: "/admin"
  },
  {
    path: "/settings",
    name: "Settings",
    //icon: "nc-icon nc-settings-gear-65",
    component: Settings,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User",
    //icon: "nc-icon nc-settings-gear-65",
    component: User,
    layout: "/admin"
  },
  {
    path: "/challenges",
    name: "Challenges",
    //icon: "nc-icon nc-settings-gear-65",
    component: ChallengeHome,
    layout: "/admin"
  },
  {
    path: "/challenges/challengepm",
    name: "Portfolio Management Challenge",
    //icon: "nc-icon nc-settings-gear-65",
    component: ChallengePM,
    layout: "/admin"
  }
  
];

export {routes, sidebar_routes}