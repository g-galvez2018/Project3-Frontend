import React, { Component } from 'react';
import axios from "axios";

class EditClient extends Component {
  
  state = {
      accountname: this.props.accountName,
      address1: this.props.address1,
      Phone: this.props.Phone,
      active: this.props.active
  }

  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    // stop the page refresh
    event.preventDefault();

    // PUT and POST requests receive a 2nd argument: the info to submit
    // (we are submitting the state we've gathered from the form)
    axios.put(
      process.env.REACT_APP_SERVER_URL + `/api/phones/${this.props.thePhone._id}`,
      this.state,
      { withCredentials: true } // FORCE axios to send cookies across domains
    )
      .then(response => {
        //   instead of using <Redirect /> we use this.props.history.push()
        this.props.history.push('/phone-list'); 
      })
      .catch(err => {
        console.log("Update Phone ERROR", err);
        alert("Sorry! Something went wrong.");
      });
  }

  render(){
    return(
      <section>
        <form onSubmit={event => this.handleSubmit(event)}>
          <label>Account Name:</label>
          <input 
              value = { this.state.accountName }
              onChange={ e => this.genericSync(e) }
              type = "text"
              name = "accountName"
              
           />
           <br />          

          <label>Address:</label>
          <input 
              value = { this.state.address1 }
              onChange={ e => this.genericSync(e) }
              type = "text"
              name = "address1"
              
           />
           <br />

          <label>Phone:</label>
          <input 
              value = { this.state.Phone }
              onChange={ e => this.genericSync(e) }
              type = "text"
              name = "Phone"
              
           />
           <br />

          <label>Active:</label>
          <input type="checkbox"
              name="active"
              checked={this.state.active}
              onChange={this.toggleChange}
          />
          <br />
          <button>Update</button> 
        </form>

      </section>
    )
  }
}

export default EditClient;