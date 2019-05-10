import React, { Component } from 'react';
import axios from "axios";
import {
  Button,
  Form,
  Grid,
  Header,  
  Segment,
} from 'semantic-ui-react';

class Signup2 extends Component {
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

  render(){
    return(
      <Grid centered columns={2}>
      <Grid.Column>
        <Header as="h2" textAlign="center">
          Login
        </Header>
        <Segment>
          <Form size="large" onSubmit={event => this.handleSubmit(event)}>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Full Name"
              value={this.state.fullName}
              onChange={event => this.genericSync(event)}
              type="text" 
              name="fullName"                            
            />
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Email Address"
              value={this.state.email}
              onChange={event => this.genericSync(event)}
              type="email" 
              name="email"                            
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={this.state.originalPassword}
              onChange={event => this.genericSync(event)}
              name="originalPassword"                            
            />

            <Button color="blue" fluid size="large">
              Sign Up
            </Button>
          </Form>
        </Segment>      
      </Grid.Column>
    </Grid>
    )
  }
}

export default Signup2;