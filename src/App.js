import React, { Component } from 'react';
import './App.css';

import { Switch, NavLink, Route } from "react-router-dom";

import axios from "axios";

import Signup from './components/user-pages/Signup';
import Login from './components/user-pages/Login';
import Home from './components/Home';
import AddTicket from './components/tech-pages/AddTicket'
import AddClient from './components/client-pages/Add-Client'
import ClientList from './components/client-pages/Client-List'
import EditClient from './components/client-pages/Edit-Client'
import UserList from './components/admin-pages/User-List'
import EditUser from './components/admin-pages/Edit-User'
import Navbar from './components/site-pages/Navbar'

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser: null,
      role: null,
      name: null,
    }
  }

  componentDidMount(){
    axios.get(`${process.env.REACT_APP_API_URL}/api/checkuser`, { withCredentials:true })
    .then(responseFromBackend => {
     console.log("Check User in APP.JS: ",responseFromBackend.data.userDoc)
      const { userDoc } = responseFromBackend.data;
      //console.log("userDoc", userDoc.role)
      this.syncCurrentUser(userDoc);
    })
    .catch(err => console.log(" Err while check the user: ", err))
  }

  // this is the method for updating "currentUser"
  // (must be defined in App.js since it's the owner of "currentUser" now)
  syncCurrentUser(user){
    this.setState({ currentUser: user });    
    //this.setState({ role: user.role})
    //this.setState({ name: user.fullName })
    //console.log("usuario",this.state.name)
  }

  render() {
    //const {role} = this.state.currentUser
   // console.log(role)
    return (
      <div className="App">        
        <div className="container">
          {this.state.currentUser ?(
            <Navbar userName={this.state.name} onUserChange={ userDoc => this.syncCurrentUser(userDoc) } />
          ):
          <Navbar />}
            <Switch>
              {/* this is example how to normally do the Route: */}
              {/* <Route path="/somePage" component={ someComponentThatWillRenderWhenUSerClickThisLink }   /> */}
              <Route exact path="/" component={ Home } />
                {/* this way we use when we are passing params down to componentDidMount() {
                  so we can't use component={}, but instead we have to use render ={() => <someComponent/>}
                }
                  */}
              <Route path="/signup-page" render={ () => 
                <Signup currentUser={this.state.currentUser} 
                onUserChange={ userDoc => this.syncCurrentUser(userDoc) }   />
               }  />
              
              <Route path="/login-page" render={ () => 
                <Login currentUser={ this.state.currentUser } 
                onUserChange={userDoc => this.syncCurrentUser(userDoc)} />
              }  />

              <Route path="/add-ticket" component={ AddTicket }/>
              <Route path="/add-client" component={ AddClient }/>
              <Route path="/client-list" component={ ClientList }/>
              <Route path="/edit-client/:clientId" component={ EditClient }/>
              <Route path="/user-list" component={ UserList }/>
              <Route path="/edit-user/:userId" component={ EditUser }/>             
              
            </Switch>
        </div>
      </div>
    );
  }
}

export default App;
