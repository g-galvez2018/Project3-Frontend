import React, { Component } from "react";
import axios from 'axios';
import {
  Button,
  Form,
  Grid,
  Header,  
  Segment,
} from 'semantic-ui-react';

class Login2 extends Component {

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

  render() {
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
                  placeholder="Email address"
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
                  Login
                </Button>
              </Form>
            </Segment>      
          </Grid.Column>
        </Grid>
    )}
}

export default Login2;