import React, { Component } from "react";
import "./App.css";
import { Navbar, Body, Footer } from "./template";
import { BrowserRouter as Router } from 'react-router-dom'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentPage: "home",
      loginStatus: true,
    };
  }
  changePage = (page) => {
    this.setState({
      currentPage: page,
    });
  };
  changeStatus = (status, page) => {
    this.setState({
      currentPage: page,
      loginStatus: status,
    });
  };
  render() {
    console.log(this.state.currentPage);
    return (
      <>
        <Router>
          <Navbar
            loginStatus={this.state.loginStatus}
            changeStatus={this.changeStatus}
          />

          <Body
            changeStatus={this.changeStatus}
            loginStatus={this.state.loginStatus}
          />
          <Footer />
        </Router>
      </>
    );
  }
}

export default App;
