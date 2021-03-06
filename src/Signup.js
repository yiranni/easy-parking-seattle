import React, { Component } from 'react';
import { HashRouter as Route, Link } from 'react-router-dom';
import './Signup.css';
import { ButtonToolbar } from 'react-bootstrap';
import Signin from './Signin';
import Maps from './Maps';

class Signup extends Component {
    render() {
        let displayDiv = "";
        if (!this.props.user) {
            displayDiv = 
            <>
                <h2 className="welcome">
                    Welcome to
                </h2>
                <div className="title">
                    Easy Parking Seattle
                </div>
                <div className="notif">
                    Already have an account? <Link to={"/signin"} activeClassName="active">Sign in</Link><Route path="/signin" component={ Signin } />
                </div>
                {this.props.errorMessage === "" ? "" : <div className="alert alert-danger">Error: {this.props.errorMessage}</div>}
                <div className="form-group">
                    <label>Email:</label>
                    <input className="form-control"
                        name="email"
                        value={this.props.email}
                        onChange={(event) => { this.props.handleChange(event) }}
                    />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control"
                        name="password"
                        value={this.props.password}
                        onChange={(event) => { this.props.handleChange(event) }}
                    />
                </div>

                <div className="form-group">
                    <label>Username:</label>
                    <input className="form-control"
                        name="username"
                        value={this.props.username}
                        onChange={(event) => { this.props.handleChange(event) }}
                    />
                </div>

                <div className="form-group-buttons">
                    <ButtonToolbar>
                        <button className="btn btn-primary mr-2" onClick={() => this.props.handleSignUp()}>
                            Sign Up
                        </button>
                    </ButtonToolbar>
                </div>
            </>
        } else {
            displayDiv = 
            <>
                <div className="user">Hello, {this.props.user.displayName}</div>
                <p>You can now leave comments on selected parking stations when you visit our <Link to={"/maps"} activeClassName="active">Map</Link><Route path="/maps" component={ Maps } />!</p>
            </>
        }
        return (
            <div className="container">{displayDiv}</div>
        );
    }
}

export default Signup;