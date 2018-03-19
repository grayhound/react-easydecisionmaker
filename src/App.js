import React, {Component} from "react";
import AppNavigation from "./AppNavigation";
import DecisionMaker from "./DecisionMaker/DecisionMaker";
import "./App.css";
import {Container} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  handleAskQuestion() {

  }

  render() {
    return (
      <div>
        <AppNavigation/>
        <Container>
            <DecisionMaker/>
        </Container>
      </div>
    );
  }
}

export default App;
