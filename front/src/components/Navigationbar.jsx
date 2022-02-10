import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
export default function Navigationbar() {
  const feedDiv = document.querySelector(".feedDiv");
  const analyticsDiv = document.querySelector(".analytics");
  const moveToFeed = () => {
    feedDiv.style.left = "0%";
    analyticsDiv.style.left = "-100%";
  };
  const moveToAnalytics = () => {
    feedDiv.style.left = "100%";
    analyticsDiv.style.left = "0%";
  };
  return (
    <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <img
            alt="logo"
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Dark Web Scraping
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <button onClick={moveToAnalytics} className="navbarLinks">
              Analytics
            </button>
            <button onClick={moveToFeed} className="navbarLinks">
              Feed
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
