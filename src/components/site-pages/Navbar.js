import React, { Component } from 'react';
import axios from "axios";
import { NavLink, Redirect } from "react-router-dom";

class Navbar extends Component {
  logoutClick() {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/logout`,
        { withCredentials: true } // FORCE axios to send cookies across domains
      )
      .then(response => {
        const { userDoc } = response.data;
        this.props.onUserChange(userDoc);
      })
      .catch(err => {
        console.log("Logout ERROR", err);
        alert("Sorry! Something went wrong.");
      });
  }


  render(){
    //let {fullName} = this.props.userName
    return(
      <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mt-5 mb-5">          
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/login-page"> Login </NavLink>  
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup-page"> Signup </NavLink>  
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/user-list">User List </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/client-list">Client List </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-ticket"> Add Ticket </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-client"> Add Client </NavLink>
            </li>
          </ul>
          {this.props.userName ?
              <span className="navbar-text">
                {this.props.userName}  | 
                <button onClick={() => this.logoutClick()} className="button">Logout</button> 
              </span> :
              <span>Login </span>
          }
       </div>
      </nav>      
    </header>
    )
  }
}

export default Navbar;