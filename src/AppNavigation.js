import React, {Component} from "react";
import {Container, Navbar, NavbarBrand} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

class AppNavigation extends Component {
    render() {
        return (
            <Navbar color="dark" dark>
                <Container>
                    <NavbarBrand href="#">Easydecisionmaker</NavbarBrand>
                </Container>
            </Navbar>
        );
    }
}

export default AppNavigation;
