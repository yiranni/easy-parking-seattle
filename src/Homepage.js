import React, { Component } from 'react';
import { Card, CardText, CardTitle } from 'reactstrap';
import { Col, Row } from 'react-bootstrap';
import './Homepage.css';
import './background.jpg';

class Homepage extends Component {
    render() {
        return (
            <div className='container'>
                <h2>Hassle-Free Parking</h2>
                <Row>
                    <Col xs="12" sm="6">
                        <p>
                        Seattle, Washington is a beautiful and lively city in the Pacific Northwest region, but its traffic is getting worse and worse. This directly affects the parking situation in our community, so this application is born. The problem of finding parking spaces is concerning to the general population in Seattle because everyone will encounter unfamiliar places where they struggle to find parking at some point. Not only such drivers will waste their time and energy circling around to look for parking, they might also cause traffic and disturb others who share the road with them. For this reason, this web application is important to have!
                        </p >
                    </Col>
                    <Col xs="12" sm="6">
                        < img src={require('./background.jpg')} alt='background' />
                    </Col>
                </Row>
                <Row>
                    <Col sm="4">
                        <Card body>
                            <CardTitle>READY</CardTitle>
                            <CardText>Reserve your parking spaces<br />Avoid troubles later</CardText>
                        </Card>
                    </Col>
                    <Col sm="4">
                        <Card body>
                            <CardTitle>SET</CardTitle>
                            <CardText>Add a stop to your navigator<br />Easy to locate</CardText>
                        </Card>
                    </Col>
                    <Col sm="4">
                        <Card body>
                            <CardTitle>GO</CardTitle>
                            <CardText>Show up with your confirmation<br />Pay and go</CardText>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Homepage;