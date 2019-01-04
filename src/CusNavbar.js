import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, Modal, Button } from 'react-bootstrap';
import './CusNavbar.css';
import MediaQuery from 'react-responsive';
import firebase from 'firebase/app';
import 'firebase/auth';

class CusNavbar extends Component {
  
  // Set initial state in constructor
  constructor(props) {
    super(props);
    this.state = {
        user: null,
        email: '',
        password: '',
        username: '',
        errorMessage: '',
        show: false
    };
  };

  componentDidMount() {
      
      // Listen to authentication state change
      firebase.auth().onAuthStateChanged((user) => {
          
          // If there is a user, set the state of `user`
          if (user) {
            this.setState({
              user: user,
              email: '',
              password: '',
              errorMessage: ''
            });
          } else {
              this.setState({ user: null });
          }
      });
  };

  // Method for handling someone signing out
  handleSignOut() {
            
    // Sign out the user -- this will trigger the onAuthStateChanged() method
    firebase.auth().signOut()
        .catch((err) => {
            this.setState({ errorMessage: err.message });
        });
    this.setState({ show: false });
  }
  
  render() {
    let displayDiv = "";
    if (this.state.user) {
        displayDiv = 
          <>
            <NavItem eventKey={4} onClick={() => this.setState({ show: true })}>
              Sign Out
            </NavItem>
            <Modal show={this.state.show}>
                <Modal.Header>
                    <Modal.Title>Signing Out</Modal.Title>
                </Modal.Header>

                <Modal.Body>Are you sure you want to sign out?</Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => this.setState({ show: false })}>Cancel</Button>
                    <Button bsStyle="primary" onClick={() => this.handleSignOut()}>Yes</Button>
                </Modal.Footer>
            </Modal>
          </>
    } else {
        displayDiv = 
        <>
          <NavItem eventKey={4} componentClass={Link} href="/signup" to="/signup">
            Sign Up
          </NavItem>
          <NavItem eventKey={5} componentClass={Link} href="/signin" to="/signin">
            Sign In
          </NavItem>
        </>
    }
    return (
      <Navbar default collapseOnSelect>
        <Navbar.Header>
        <MediaQuery maxDeviceWidth={768}>
          <Navbar.Brand>
            <p>E</p>
          </Navbar.Brand>
        </MediaQuery>
        <MediaQuery minDeviceWidth={769}>
          <Navbar.Brand>
            <p>Easy</p>
            <p>Parking</p>
            <p>Seattle</p>
          </Navbar.Brand>
        </MediaQuery>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} componentClass={Link} href="/" to="/">
              Home
            </NavItem>
            <NavItem eventKey={2} componentClass={Link} href="/maps" to="/maps">
              Map
            </NavItem>
            <NavItem eventKey={3} componentClass={Link} href="/about" to="/about">
              About
            </NavItem>          
            {displayDiv}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default CusNavbar;