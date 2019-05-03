import React, { Component } from 'react';
import axios from 'axios';
import Dropdown from '../form-pages/Dropdown';

class AddTicket extends Component {

  state = {
    accountName: "",
    contact: "",
    status: "",
    priority: "",
    issueType: "",
    primaryResource: "<<Select One>>" ,
    ticketTitle:"",
    ticketDescription: "",
    isSubmitSuccessful: false,  
  }

  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event){
    event.preventDefault();

    axios.post(
        "http://localhost:3001/tickets/addTicket",
        this.state,
        { withCredentials: true }
    )
    .then( response => {
        console.log("new ticket: ", response.data);
        this.setState({ isSubmitSuccessful: true })
    } )
    .catch( err => console.log(err) );
  }

  render(){
    return(
      <section>
        <h2> Add Ticket</h2>
        <form onSubmit={ event => this.handleSubmit(event) } >
          <label> Account Name: </label>
          <input 
              value = { this.state.accountName }
              onChange={ e => this.genericSync(e) }
              type = "text"
              name = "accountName"
              placeholder = ""
          />

          <label> Contact: </label>
          <input 
              value = { this.state.contact }
              onChange={ e => this.genericSync(e) }
              type = "text"
              name = "contact"
              placeholder = ""
          />

          <label> Status: </label>
          <input 
              value = { this.state.status }
              onChange={ e => this.genericSync(e) }
              type = "text"
              name = "status"
              placeholder = ""
          />

          <label> Priority: </label>
          <input 
              value = { this.state.priority }
              onChange={ e => this.genericSync(e) }
              type = "text"
              name = "priority"
              placeholder = ""
          />

          <label> Issue Type: </label>
          <input 
              value = { this.state.issueType }
              onChange={ e => this.genericSync(e) }
              type = "text"
              name = "issueType"
              placeholder = ""
           />

          <label> Primary Resource: </label>      

           <Dropdown 
            value = { this.state.primaryResource }
            onChange={ e => this.genericSync(e) }
            type = "text"
            name = "primaryResource"
            placeholder = ""
           
           />
           

           <label> Ticket Title: </label>
            <input 
              value = { this.state.ticketTitle }
              onChange={ e => this.genericSync(e) }
              type = "text"
              name = "ticketTitle"
              placeholder = ""
           />

          <label> Ticket Description: </label>
            <input 
              value = { this.state.ticketDescription }
              onChange={ e => this.genericSync(e) }
              type = "text"
              name = "ticketDescription"
              placeholder = ""
           />
           <button>Submit</button>        
        
        </form>
      </section>
    )
  }



}

export default AddTicket;