import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import Navbar from './CusNavbar';
import Homepage from './Homepage';
import Maps from './Maps';
import About from './About';
import Signup from './Signup';
import Signin from './Signin';
import Footer from './Footer';
import firebase from 'firebase/app';
import 'firebase/auth';

class App extends Component {
  
  // Set initial state in constructor
  constructor(props) {
    super(props);
    this.state = {
        user: null,
        email: '',
        password: '',
        username: '',
        errorMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

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
  }

  // Method for handling changes to forms
  handleChange(event) {
      let field = event.target.name; // which input
      let value = event.target.value; // what value

      let changes = {}; // object to hold changes
      changes[field] = value; // change this field
      this.setState(changes); // update state
  }

  // Method for handling someone signing up 
  handleSignUp() {

      // Create a new user and save their information
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => {
              
              // Update the display name of the user
              let profilePromise = firebase.auth().currentUser.updateProfile({
                  displayName: this.state.username
              });

              // Return promise for chaining
              return profilePromise;
          })
          .then(() => {
              
              // Set the state as the current (firebase) user
              this.setState({
                  user: firebase.auth().currentUser,
                  username: ''
              });
          })
          .catch((err) => {
              this.setState({ errorMessage: err.message });
          });
  }

  // Method for handling someone signing in
  handleSignIn() {
          
    // Sign in the user 
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch((err) => {
            this.setState({ errorMessage: err.message });
        });
  }

  // Method for handling someone signing out
  handleSignOut() {
      
      // Sign out the user -- this will trigger the onAuthStateChanged() method
      firebase.auth().signOut()
          .catch((err) => {
              this.setState({ errorMessage: err.message });
          });
  }
  
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Homepage} />
          <Route path="/maps" render={() => <Maps user={this.state.user} />} />
          <Route path="/about" component={About} />
          <Route path="/signup" render={() => <Signup user={this.state.user} email={this.state.email} password={this.state.password} username={this.state.username} errorMessage={this.state.errorMessage} setState={this.setState} handleChange={this.handleChange} handleSignUp={this.handleSignUp} />} />
          <Route path="/signin" render={() => <Signin user={this.state.user} email={this.state.email} password={this.state.password} errorMessage={this.state.errorMessage} setState={this.setState} handleChange={this.handleChange} handleSignIn={this.handleSignIn} />} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;