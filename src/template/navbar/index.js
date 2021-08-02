import React, { Component } from "react";
import { Menu } from "../../component";
import logo from "../../image/avatar11066402_1.png";
import "./navbar.css";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom'


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  checkActivePage = (checkPage) => {
    const page = this.props.page;
    if (checkPage === page) return "active";
    return "";
  };
  checkLogin = () => {
    const { loginStatus, goToPage } = this.props;
    return (
      <Link to="/productList">
        <Menu
          activePage={this.checkActivePage("productList")}
          // redirect={() =>
          //   loginStatus
          //     ? goToPage("productList")
          //     : Swal.fire(
          //       "Kijang Satu ganti",
          //       "Penyusup, bukan Admin Banteng",
          //       "error"
          //     )
          // }
        >
          ProductList
        </Menu>
      </Link>
    );
  };
  checkLogout = () => {
    const { loginStatus, changeStatus, goToPage } = this.props;
    if (loginStatus)
      return (
        <Link to="/labaRugi">
          <Menu
            activePage={this.checkActivePage("labaRugi")}            
          >
            Laba Rugi
          </Menu>
          <Menu redirect={() => changeStatus(false, "Home")}>Logout</Menu>
        </Link>
      );
    return (
      <Link to="/login">
        <Menu
          isActivePage={this.checkActivePage("login")}          
        >
          Login
        </Menu>
      </Link>
    );
  };
  redirectPage = () => {
    this.props.goToPage("Home");
  };
  render() {
    const { goToPage } = this.props;
    return (
      <>
        <div className="topnav">
          <Link to="/home">
          <div
            className="logo"
            activePage={this.checkActivePage("home")}            
          >
            <span>
              <img src={logo} alt="logo" />
            </span>
            Tokopedei
          </div>
          </Link>
          <div className="topnav-right">
            <Link to="/home">
              <Menu
                activePage={this.checkActivePage("home")}
              >
                Home
              </Menu>
            </Link>
            <Link to="/about">
              <Menu
                activePage={this.checkActivePage("about")}
              >
                About
              </Menu>
            </Link>
            {/* <Menu
              activePage={this.checkActivePage("home")}
              redirect={() => goToPage("home")}
            >
              Home
            </Menu>
            <Menu
              activePage={this.checkActivePage("about")}
              redirect={() => goToPage("about")}
            >
              About
            </Menu> */}
            {this.checkLogin()}

            {/* <Menu
              activePage={this.checkActivePage("AddForm")}
              redirect={() => goToPage("AddForm")}
            >
              Add Form
            </Menu> */}

            {this.checkLogout()}
          </div>
        </div>
      </>
    );
  }
}

export default Navbar;
