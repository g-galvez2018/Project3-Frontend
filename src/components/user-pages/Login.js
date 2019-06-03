import React, { Component } from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Login extends Component {   
    state = {
        email: "",
        originalPassword: "",
        message: null,
    }
    
    genericSync(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();    
        axios.post(
            `${process.env.REACT_APP_API_URL}/api/login`,
            this.state,
            { withCredentials: true }, // FORCE axios to send cookies across domains
        )
        .then(response => {
            console.log("Login Page", response.data);            
            const { userDoc } = response.data;
            // send "userDoc" to the App.js function that changes "currentUser"
            this.props.onUserChange(userDoc);
            console.log('success')
        })
        .catch(err => {
            if (err.response && err.response.data) {
              // console.error("API response", err.response.data)
              return  this.setState({ message: err.response.data.message }) 
            }
        });
    }



    render(){
        // check if currentUser exists and if so, redirect to some other page
        if(this.props.currentUser){
            return <Redirect to="/" />
        }
        return(
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card rounded-0">
                        <div className="card-header">
                            <h3 className="mb-0 my-2">Sign in</h3>
                        </div>
                    <div className="card-body">
                        <form onSubmit={event => this.handleSubmit(event)}>
                            <div className="form-group">
                                <label> Email:  </label>
                                <input 
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={event => this.genericSync(event)}
                                    type="email" 
                                    name="email" 
                                    placeholder="Email address" 
                                />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input 
                                    className="form-control"
                                    value={this.state.originalPassword}
                                    onChange={event => this.genericSync(event)}
                                    type="password" 
                                    name="originalPassword" 
                                    placeholder="*******"
                                />
                            </div>
                            <button className="btn btn-secondary btn-lg btn-block">Log In</button>
                        </form>
                        { this.state.message && <div> { this.state.message } </div> }
                    </div>
                </div>
            </div>
        </div>
       )
    }
}

export default Login;