import React, { Component } from 'react';
import axios from "axios";

class Signup extends Component {
  state = {
     fullName: "",
     email: "",
     originalPassword: "",
     message: null
  }; 
  genericSync(event){
    const { name, value } = event.target;
    this.setState({ [name]:value });
  }
  handleSubmit(event){
    event.preventDefault();
    axios.post(
        `${process.env.REACT_APP_API_URL}/api/signup`, // 1st and mandatory: which route I'm hitting in the backend
        this.state, // 2nd and mandatory: what I'm sending (since it's POST route I have to send something)
        { withCredentials:true } // 3rd and optional: credentials:true in CORS
    )
    .then( responseFromServer => {
         //console.log("response is: ", responseFromServer);
        const { userDoc } = responseFromServer.data;
        this.props.onUserChange(userDoc);
    } )
    .catch(err => {
        // console.log("error while signup: ", err);
        if(err.response && err.response.data){
            return this.setState({ message:err.response.data.message });
        }
    })    
  }
  render () {    
    if(this.props.currentUser){
        return(
            <section>
                <h2> You are signed up! </h2>
                <p> Welcome, { this.props.currentUser.fullName }! 
                    Your email is: <b> { this.props.currentUser.email } </b>
                </p>
            </section>
        )
   }  

  return (
    <div className="row">
        <div className="col-md-6 mx-auto ">
            <div className="card rounded-0">
                <div className="card-header">
                    <h3 className="mb-0 my-2">Create Account</h3>
                </div>
                <div className="card-body">       
                    <form onSubmit={ event => this.handleSubmit(event) } >
                       <div className="form-group">
                            <label> Full Name </label>
                            <input
                                className="form-control"
                                value = { this.state.fullName }
                                onChange={ event => this.genericSync(event) }
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                            />
                        </div>
                        <div className="form-group">
                            <label> Email </label>
                            <input
                                className="form-control"
                                value = { this.state.email }
                                onChange={ event => this.genericSync(event) }
                                type="email"
                                name="email"
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="form-group">
                            <label> Password </label>
                            <input
                                className="form-control"
                                value = { this.state.originalPassword }
                                onChange={ event => this.genericSync(event) }
                                type="password"
                                name="originalPassword"
                                placeholder="*******"
                            />
                        </div>
                        
                        <button className="btn btn-secondary btn-lg btn-block"> Sign Up </button>
                    </form>
                    {/* if the message is not NULL then show the message */}
                    { this.state.message && <div> { this.state.message } </div> }
                </div>
            </div>
        </div>
     </div>
   
    )
  }
}

export default Signup;








