import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import './About.css';
import './purpose.jpg';
import './demi.jpg';
import './yiran.png';
import './leo.jpg';
import './nikhil.jpeg';

class About extends Component {
    render() {
        return (
            <div className='container'>
                <h2>PURPOSE</h2>
                <Row>
                    <Col xs="12" sm="6">
                    <p>
                        This project started out as a general idea of to help users search for available spaces in a designated area. As more thoughts were put into it, it is narrowed down to help users find parking spaces ahead of time, specifically in Seattle. By creating an application in this domain, the general public will be able to make parking arrangements ahead of time, along with their trip planning. This application will allow users to access information regarding available street parking, public parking, and parking garages near their destination, such as hours of operation, parking fees, number of spaces available, etc. These information are currently unavailable to users in a uniform manner until they have reached the location where they will rush to find parking cluelessly. For example, some streets only allow drivers to park for a maximum of two hours, while others might enforce a different rule like four hours, even when they are just a street apart. Users will be greatly benefited by such applications where they have all the information in hand so they can avoid unintentional parking violations.
                    </p>
                    </Col>
                    <Col xs="12" sm="6">
                        <img src={require('./purpose.jpg')} alt='purpose' />
                    </Col>
                </Row>
                <h2>FOUNDERS</h2>
                <Row>
                    <Col xs="6">
                        <h3>
                            <i>Demi Tu</i>
                        </h3>
                        <p>
                            Software Developer, Data Scientist
                            <br />
                            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/demi-tu">
                                View More
                            </a>
                        </p>
                    </Col>
                    <Col xs="6">
                    <h3>
                        <i>Yiran Ni</i>
                    </h3>
                    <p>
                        Software Developer, UX Designer
                        <br />
                        <a target="_blank" rel="noopener noreferrer" href="http://www.yiranni.me">
                           View More
                        </a>
                    </p>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" md="3">
                        <img src={require('./demi.jpg')}  alt='Demi' />
                    </Col>
                    <Col xs="6" md="3" mdOffset="3">
                        <img src={require('./yiran.png')} alt='Yiran' />
                    </Col>
                </Row>
                <Row>
                    <Col xs="6">
                        <h3>
                            <i>Leo Cai</i>
                        </h3>
                        <p>
                            Software Developer, Data Scientist
                            <br />
                            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/leo-wanxiang-cai-161220114/">
                            View More
                            </a>
                        </p>
                    </Col>
                    <Col xs="6">
                        <h3>
                            <i>Nikhil Goel</i>
                        </h3>
                        <p>
                            Consultant
                            <br />
                            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/nikhil-goel-1741b9b0/">
                            View More
                            </a>
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" md="3">
                        <img src={require('./leo.jpg')}  alt='Leo' />
                    </Col>
                    <Col xs="6" md="3" mdOffset="3">
                        <img src={require('./nikhil.jpeg')} alt='Nikhil' />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default About;