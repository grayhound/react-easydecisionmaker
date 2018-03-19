import React, {Component} from "react";
import AppForm from "../AppForm/AppForm";
import DecisionMakerResult from "./DecisionMakerResult";
import {Col, Row} from "reactstrap";

class DecisionMaker extends Component {
    constructor(props) {
        super(props);
        this.defaultQuestion = 'Some Random Question';
        this.defaultAnswer0 = 'Yes';
        this.defaultAnswer1 = 'No';
        this.decisionMakerResultRef = 'decisionMakerResult';
        this.appFormRef = 'AppForm';
        this.state = {
            'isResult': false,
        }
    }

    showResult(data) {
        if (!data.question) {
            data.question = this.defaultQuestion;
        }
        if (!data.answers[0].value) {
            data.answers[0].value = this.defaultAnswer0;
        }
        if (!data.answers[1].value) {
            data.answers[1].value = this.defaultAnswer1;
        }
        this.setState({
            'isResult': true,
        });
        this.refs[this.decisionMakerResultRef].showResult(data);
    }

    askAnotherQuestion() {
        this.setState({
            'isResult': false,
        });
        this.refs[this.appFormRef].resetForm();
    }

    render() {
        return (
            <div>
                <div style={{ display: this.state.isResult ? 'block' : 'none' }}>
                    <DecisionMakerResult ref={ this.decisionMakerResultRef }
                                         askAnotherQuestion={ this.askAnotherQuestion.bind(this) } />
                </div>
                <div style={{ display: this.state.isResult ? 'none' : 'block' }}>
                    <Row className="help-text-title justify-content-center">
                        <Col className="text-center" xs="8">
                            Enter a question and add options. If options are empty default will be "Yes" and "No"
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs="8">
                            <AppForm showResult={ this.showResult.bind(this) } ref={ this.appFormRef } />
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default DecisionMaker;
