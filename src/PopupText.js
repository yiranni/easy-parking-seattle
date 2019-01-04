import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import './PopupText.css';

class PopupText extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            key: "",
            comments: null,
            comment: ""
        };
    }

    componentDidMount() {
        let pkey = this.props.info.attributes.OBJECTID;
        this.commentsRef = firebase.database().ref('comments').child(pkey);
        this.commentsRef.on('value', (snapshot) => {
            let values = snapshot.val();
            if (values != null) {
                this.setState({
                    comments: Object.values(values)
                });
            } else {
                this.setState({
                    comments: null
                });
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.info !== prevProps.info) {
            let pkey = this.props.info.attributes.OBJECTID;
            this.commentsRef = firebase.database().ref('comments').child(pkey);
            this.commentsRef.on('value', (snapshot) => {
                let values = snapshot.val();
                if (values != null) {
                    this.setState({
                        comments: Object.values(values)
                    });
                } else {
                    this.setState({
                        comments: null
                    });
                }
            });
        }
    }

    handleChange(e) {
        this.setState({ comment: e.target.value });
    }

    handleSubmit(e) {
        let value = this.props.user + ": " + this.state.comment;
        this.commentsRef.push(value).catch((d) => console.log("error", d));
        e.preventDefault();
        e.target.reset();
        this.setState({
            comment: ""
        });
    }

    render() {
        let key = 1;
        let displayDiv = "";
        let commentDiv = "";
        if (this.props.user) {
            displayDiv = 
                <form onSubmit={this.handleSubmit}>
                    <label>Comment:
                        <input type="text"
                            name="comment"
                            onChange={this.handleChange} 
                            className="popInput"
                        />
                    </label>
                    <input type="submit" value="Submit" className="popInput"/>
                </form>
        }
        if (this.state.comments != null) {
            commentDiv =
            <>
                <div className="userInput">Comments</div>
                <ul className="list-unstyled">
                    {this.state.comments.map(c => <li key={key = key + 1}>{c}</li>)}
                </ul>
            </>
        }
        return (
            <>
                <div><b>Type:</b> Street Parking</div>
                <div><b>Location:</b> {this.props.info.attributes.UNITDESC}</div>
                <div><b>Paid Parking Hours and Rates:</b>
                    <ul>
                        <li>Monday - Friday: {this.props.info.attributes.START_TIME_WKD} to {this.props.info.attributes.END_TIME_WKD}</li>
                        <ul>
                            <li>Morning: ${this.props.info.attributes.WKD_RATE1} / hr</li>
                            <li>Afternoon: ${this.props.info.attributes.WKD_RATE2} / hr</li>
                            <li>Evening: ${this.props.info.attributes.WKD_RATE3} / hr</li>
                        </ul>
                    </ul>
                    <ul>
                        <li>Saturday: {this.props.info.attributes.START_TIME_SAT} to {this.props.info.attributes.END_TIME_SAT}</li>
                        <ul>
                            <li>Morning: ${this.props.info.attributes.SAT_RATE1} / hr</li>
                            <li>Afternoon: ${this.props.info.attributes.SAT_RATE2} / hr</li>
                            <li>Evening: ${this.props.info.attributes.SAT_RATE3} / hr</li>
                        </ul>
                    </ul>
                    {displayDiv}
                    {commentDiv}                   
                </div>
            </>
        );
    }
}

export default PopupText;