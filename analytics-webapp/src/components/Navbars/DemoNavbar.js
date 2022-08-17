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

// ref: https://github.com/kolitiri/fastapi-oidc-react/blob/master/react/apps/frontend/src/App.js

import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  Container,
} from "reactstrap";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import {useHistory} from "react-router-dom"
import {routes, sidebar_routes} from "routes.js";
import Button from "@restart/ui/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import { users } from "reducers/cache_user";
import { saveUser, clearUser, setToken, clearToken } from "reducers/cache_user";
import Cookies from 'js-cookie'


//const UserInfoContext = React.createContext();


function Header(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  const [temp_access_token, setTempAccessToken] = React.useState(null);
  const sidebarToggle = React.useRef();
  const location = useLocation();
  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };

  const API_URL = process.env.REACT_APP_API_URL
  const producerLoginRedirectEndpoint= `http://${API_URL}/login-redirect`;
  const producerLoginEndpoint = `http://${API_URL}/login/`;
  const producerLogoutEndpoint = `http://${API_URL}/logout/`;
  const producerLoginCheckEndpoint = `http://${API_URL}/user-session-status/`;

  const dispatch = useDispatch()
  var user = useSelector(state => state.users.user)
  var access_token = useSelector(state => state.users.access_token)
  
  React.useEffect(() => {
    authenticate();
  }, [])

  const setCookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  const getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const authenticate = () => {
    var authToken = (window.location.search.match(/authToken=([^&]+)/) || [])[1]
    window.history.pushState('object', document.title, "/");

    if (authToken) {
      // Try to get an access token from the server
      getAccessToken(authToken)
    } else {
      // Check user is logged in
      checkUserSessionStatus(access_token)
    }
  }

  const getAccessToken = (authToken) => {
    const request = {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + authToken
      },
      credentials: 'include'
    }

    fetch(producerLoginEndpoint, request)
    .then(response => {
      // Check user is logged in
      var cur_access_token = 0;
      for (var pair of response.headers.entries()) {
        console.log(pair[0])
        if (pair[0] === "x-authorization"){
          cur_access_token = pair[1]
          dispatch(setToken(cur_access_token))
        }
      }
      console.log('check ', cur_access_token)
      console.log(access_token)
      checkUserSessionStatus(cur_access_token)
      
    })
    .catch(err => {})
  }

  const checkUserSessionStatus = (cur_access_token) => {

    const request = {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Authorization": (access_token === null)? cur_access_token: access_token
      },
    }

    fetch(producerLoginCheckEndpoint, request)
    .then(response => {
      if (response.ok){
        return response.json()
      }
      else{
        console.log('clear user')
        dispatch(clearUser())
      }
      })
    .then(data => {
      if (data['userLoggedIn']){
        dispatch(saveUser(data['userInfo']))
        dispatch(setToken((access_token === null)? cur_access_token: access_token))
      }
      else{
        console.log('clear user')
        dispatch(clearUser())
        dispatch(clearToken())
      }
      
    })
    .catch(err => {})
  }

  const logout = () => {
    const request = {
      method: 'GET',
      credentials: 'include'
    }

    fetch(producerLogoutEndpoint, request)
    .then(response => response.json())
    .then(data => {dispatch(clearToken())
                   dispatch(clearUser())
                   window.location.reload()})
    .catch(err => {})
  }

  function Login() {
      dispatch(clearToken())
      dispatch(clearUser())
      var auth_provider = "google-oidc"
      var login_url = producerLoginRedirectEndpoint + "?auth_provider=" + auth_provider
      window.location.href = login_url
    
  
    // return (
    //     <div>
    //       <button onClick={googleLogin}>Login</button>
    //     </div>
        
    // );
  }


  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen);
  };
  const getBrand = () => {
    let brandName = "Default Brand";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  };
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });
  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);




  const Back = () => {
    const history = useHistory();
    return (
      <div style={{marginRight: 5}}>
        <BsFillArrowLeftCircleFill onClick={history.goBack}></BsFillArrowLeftCircleFill>
      </div>
    )
  }
  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    // <UserInfoContext.Provider value={userInfo}>
    <Navbar
      color={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "dark"
          : color
      }
      expand="lg"
      className={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute fixed-top"
          : "navbar-absolute fixed-top " +
            (color === "transparent" ? "navbar-transparent " : "")
      }
      style={{height:"2px",
              padding:"0px"}}
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Back/>
          <p>  </p>
          <NavbarBrand>{getBrand()}</NavbarBrand>
        </div>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          {/* <form>
            <InputGroup className="no-border">
              <Input placeholder="Search..." />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="nc-icon nc-zoom-split" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </form> */}
          <Nav navbar>
            <NavItem>
              {/* <Link to="#pablo" className="nav-link btn-magnify">
                <i className="nc-icon nc-layout-11" />
                <p>
                  <span className="d-lg-none d-md-block">Stats</span>
                </p>
              </Link> */}
            </NavItem>
            {/* <Dropdown
              nav
              isOpen={dropdownOpen}
              toggle={(e) => dropdownToggle(e)}
            >
              <DropdownToggle caret nav>
                <i className="nc-icon nc-bell-55" />
                <p>
                  <span className="d-lg-none d-md-block">Some Actions</span>
                </p>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag="a">Action</DropdownItem>
                <DropdownItem tag="a">Another Action</DropdownItem>
                <DropdownItem tag="a">Something else here</DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
            {/* <NavItem>    
              <div className="App">
                <GoogleLogin
                  clientId="948015774179-npt9te70n4gei741hm9sfe95agqlnsag.apps.googleusercontent.com"
                  buttonText="Google Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  />
                  <br/>
                  <button onClick={temp}> Check session </button>
              </div>
            </NavItem> */}


            <Dropdown
              nav
              isOpen={dropdownOpen}
              toggle={(e) => dropdownToggle(e)}
            >
              <DropdownToggle caret={false} nav>
                <i className="nc-icon nc-circle-10" />
              </DropdownToggle>
              {(user !== null) && (user !== undefined)?
                <DropdownMenu right>
                  <DropdownItem tag="a"><Link to={{pathname: '/admin/user', state: user}}>User Profile</Link> </DropdownItem>
                  <DropdownItem tag="a" onClick={logout}>Logout</DropdownItem>
                </DropdownMenu>:
                <DropdownMenu right>
                  <DropdownItem tag="a" onClick={Login}>Login</DropdownItem>
                </DropdownMenu>
              }
            </Dropdown>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
    //</UserInfoContext.Provider>
  );
}

export default Header;
