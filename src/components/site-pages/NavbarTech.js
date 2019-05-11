import React, { Component } from 'react';
import { NavLink} from "react-router-dom";

class NavbarTech extends Component { 

  render(){
    console.log("navbar", this.props)
     if (this.props.userRole === "Client" || this.props.userRole === "Admin" || this.props.userRole === "") 
     {
       return null;
     }
    return(
      <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mt-5 mb-5">  
        <img src="https://res.cloudinary.com/dzhbvaunu/image/upload/v1557556314/IronTask/IronTask-Logo.png" width="60" height="60" alt="" />      
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">            
            <li className="nav-item">
              <NavLink className="nav-link" to="/view-ticket"> View Tickets </NavLink>
            </li>            
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-ticket"> Add Ticket </NavLink>
            </li>           
          </ul>  
                          
          <span>{this.props.userName}</span>
          {this.props.currentUser ?
            (<ul className="navbar-nav  justify-content-end">            
                <li className="nav-item dropdown">
                  <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-user"></i> Account</NavLink>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">              
                      <NavLink className="dropdown-item" style={{textDecoration:"none", backgroundColor:"white"}} activeStyle={{ backgroundColor: "grey" }} to="#" onClick={this.props.logUserOut} >Logout</NavLink>                                       
                  </div>
                </li>             
            </ul>) 
           :
           (<ul className="navbar-nav  justify-content-end">            
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-user"></i> Account</NavLink>
                <div className="dropdown-menu nav-item" aria-labelledby="navbarDropdown">              
                    <NavLink className="dropdown-item nav-link nav-item" style={{textDecoration:"none", backgroundColor:"white"}} activeStyle={{ backgroundColor: "white" }} to="/login-page">Login</NavLink>
                    <NavLink className="dropdown-item nav-link nav-item" style={{textDecoration:"none", backgroundColor:"white"}} activeStyle={{ backgroundColor: "white" }} to="/signup-page">Signup</NavLink>                  
                </div>
              </li>             
          </ul>)
         }          
       </div>
      </nav>      
    </header>
    )
  }
}

export default NavbarTech;