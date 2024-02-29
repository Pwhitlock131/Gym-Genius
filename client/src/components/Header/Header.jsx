import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

import Auth from "../../utils/auth"
import heart from "/images/circle.png"

export default function Header() {

  const loggedIn = Auth.loggedIn();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';


  return (

    <Navbar collapseOnSelect expand="sm" variant="dark" bg={loggedIn && !isHomePage ? "dark" : "dark"}>
      {loggedIn ? (
        <>
          <Navbar.Brand as={Link} to="/" className="brand brand-logged d-flex align-items-center">
            <img alt="heart" style={{ display: "inline" }} src={heart} className="heart-icon" />
           
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav >
              {/* use eventKey to show navbar style from react bootstrap */}
              <Nav.Link as={Link} to="/exercise" eventKey="1" >Exercise</Nav.Link>
              <Nav.Link as={Link} to="/history" eventKey="2">History</Nav.Link>
              <Nav.Link onClick={Auth.logout} >Logout </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>) :
        (<Navbar.Brand as={Link} to="/" className={`brand brand-new mx-auto d-flex align-items-center
          ${isLoginPage || isSignupPage ? "brand-text" : null}`}>
          <img alt="heart" style={{ display: "inline" }} src={heart} className="heart-icon" />

        </Navbar.Brand>)}
    </Navbar >

import Auth from "../../utils/auth";
import heart from "/images/circle.png";

export default function Header() {
  const loggedIn = Auth.loggedIn();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/Login';
  const isSignupPage = location.pathname === '/Signup';

  return (
    <Navbar collapseOnSelect expand="sm" variant="dark" bg={loggedIn && !isHomePage ? "dark" : "black"}>
      <Navbar.Brand as={Link} to="/" className={`brand brand-${loggedIn ? 'logged' : 'new'} d-flex align-items-center ${isLoginPage || isSignupPage ? "brand-text" : null}`}>
        <img alt="heart" style={{ display: "inline" }} src={heart} className="heart-icon" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav>
          {loggedIn ? (
            <>
              <Nav.Link as={Link} to="/exercise">Exercise</Nav.Link>
              <Nav.Link as={Link} to="/history">History</Nav.Link>
              <Nav.Link onClick={Auth.logout}>LOGOUT</Nav.Link>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/Login">LOGIN</Nav.Link>
              <Nav.Link as={Link} to="/Signup">SIGNUP</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}