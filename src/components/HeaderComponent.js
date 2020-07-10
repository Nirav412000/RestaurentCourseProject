import React, {Component} from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, NavItem, Collapse, Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            isNavOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
    }
    
    toggleNav(){
        this.setState(
            {
                isNavOpen: !this.state.isNavOpen
            }
        );
    }

    render(){
        return(
            <React.Fragment>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-md-6">
                                <h1>Restaurent Confusion</h1>
                                <p>We take inspiration from the world's best cuisines and create an unique fusion experience. Our lipsmacking creation will tickle your culinary senses! </p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="#">
                            <img src="assets/images/logo.png" height="30" width="41" alt="Restaurent COnfusion" /> 
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to="/home">
                                    <span className="fa fa-home fa-lg"> Home</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/menu">
                                    <span className="fa fa-list fa-lg"> Menu</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/aboutus">
                                    <span className="fa fa-info fa-lg"> About us</span>
                                </NavLink>
                            </NavItem>
                            
                            <NavItem>
                                <NavLink className="nav-link" to="/contactus">
                                    <span className="fa fa-address-card fa-lg"> Contact us</span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    };
}

export default Header;