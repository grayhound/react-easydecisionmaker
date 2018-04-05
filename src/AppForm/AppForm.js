import React, {Component} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import "./AppForm.css";
import GetAlphabetLetter from "../GetAlphabetLetter/GetAlphabetLetter";
import Octicon from "react-component-octicons";

class AppForm extends Component {
    constructor(props) {
        super(props);
        this.max_options = 26;
        this.state = this.getDefaultState();
        this.handleAddOptionClick = this.handleAddOptionClick.bind(this);
    }

    getDefaultState() {
        return {
            question: '',
            options_amount: 2,
            option_objects: [
                { 'id': 1, 'value': '', 'selected': false},
                { 'id': 2, 'value': '', 'selected': false},
            ]
        };
    }

    handleAddOptionClick() {
        this.setState(prevState => {
            if (prevState.options_amount >= this.max_options) {
                return {};
            } else {
                var newOptionObjects = prevState.option_objects.slice();
                var newOptionsAmount = prevState.options_amount + 1;
                newOptionObjects[newOptionsAmount - 1] = { 'id': newOptionsAmount, 'value': '' };
                return {
                    options_amount: newOptionsAmount,
                    option_objects: newOptionObjects
                }
            }
        }, () => {
            this.scrollToElement("FormBottom");
        });
    }

    handleQuestionInputOnChange(event) {
        event.persist();
        this.setState(prevState => {
            return {
                question: event.target.value
            };
        });
    }

    handleOptionInputOnChange(event, option_field_id) {
        event.persist();
        this.setState(prevState => {
            var newOptionObjects = prevState.option_objects;
            newOptionObjects[option_field_id].value = event.target.value;
            return {
                option_objects: newOptionObjects
            };
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        var data = {
            'question': this.state.question.trim(),
            'answers': this.state.option_objects,
        };
        this.props.showResult(data);
    }

    scrollToElement(ref) {
        this.refs[ref].scrollIntoView({ behavior: "smooth" });
    }

    getLetterById(letterId) {
        return new GetAlphabetLetter().getLetterById(letterId);
    }

    resetForm() {
        this.setState(this.getDefaultState());
    }

    render() {
        let renderOptions = this.state.option_objects.map((option_object, i) => {
            return (
                <Input className="option-field" type="text" name={ "option_field[" + option_object.id +"]" }
                       id={"option_field_" +  option_object.id } placeholder={this.getLetterById(i) + ":"}
                       value={ option_object.value }
                       onChange={ (e) => this.handleOptionInputOnChange(e, i) }
                       key={ i }
                />
            )
        });

        return (
            <Form className="form-100" onSubmit={ (e) => this.handleSubmit(e) }>
                <FormGroup>
                    <h1 className="text-center-xs">
                        <Label for="question_field">Question</Label>
                    </h1>
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="question_field" id="question_field"
                           value={ this.state.question }
                           placeholder="Enter Question Here"
                           onChange={ (e) => this.handleQuestionInputOnChange(e) }
                    />
                </FormGroup>
                <FormGroup>
                    <h1 className="text-center-xs">
                        <Label for="question_field">Options</Label>
                    </h1>
                </FormGroup>
                <FormGroup>
                    { renderOptions }
                </FormGroup>
                <FormGroup className="clearfix">
                    <div className="float-left">
                        <Button onClick={ this.handleAddOptionClick }>
                            <Octicon name="plus" style={{verticalAlign: 'text-bottom'}} zoom="x1.2"/> Option
                        </Button>
                    </div>
                    <div className="float-right">
                        <Button color="success">Answer</Button>
                    </div>
                </FormGroup>
                <div ref="FormBottom"/>
            </Form>
        );
    }
}

export default AppForm;