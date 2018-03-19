import React, {Component} from "react";
import {Col, Row, Button} from "reactstrap";
import "./DecisionMakerResult.css";
import GetAlphabetLetter from "../GetAlphabetLetter/GetAlphabetLetter";

class DecisionMakerResult extends Component {
    constructor(props) {
        super(props);
        this.alphabet = 'abcdefghijklmnopqrstuvwxyz';
        this.state = {
            'question': '',
            'answers': [],
        }
        this.showResult = this.showResult.bind(this);
    }

    showResult(data) {
        var answers = this.SelectRandomAnswer(data.answers);
        this.setState({
            'question': data.question,
            'answers': answers,
        });
    }

    SelectRandomAnswer(answers) {
        for (var i = 0; i < answers.length; i++) {
            answers[i].selected = false;
        }

        const randomAnswerKey = Math.floor(Math.random()*answers.length)
        answers[randomAnswerKey].selected = true;
        return answers;
    }

    getLetterById(letterId) {
        return new GetAlphabetLetter().getLetterById(letterId);
    }

    handleAskAgain() {
        this.setState((prevState) => {
            var answers = this.SelectRandomAnswer(prevState.answers);
            return {
                'answers': answers,
            }
        });
    }

    render() {
        let renderAnswers = this.state.answers.map((answer, i) => {
            return (
                <div className={ answer.selected ? "selected" : "" } key={ i }>{this.getLetterById(i)}: { answer.value }</div>
            )
        });

        return (
            <div>
                <Row className="justify-content-center">
                    <Col xs="8" className="text-center-xs">
                        <h1>{ this.state.question }</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="4" className="decision-maker-result-list">
                        { renderAnswers }
                    </Col>
                    <Col xs="4">
                        <div style={{marginBottom: "10px"}}>
                            <Button color="success" onClick={ () => this.handleAskAgain() }>Ask Again!</Button>
                        </div>
                        <div>
                            <Button color="primary" onClick={ () => this.props.askAnotherQuestion() }>Ask another question</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DecisionMakerResult;