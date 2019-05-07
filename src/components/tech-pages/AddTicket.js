import React, { Component } from 'react';
import axios from 'axios';
import DropdownResource from '../form-pages/Dropdown-Resource';
import DropdownClient from '../form-pages/Dropdown-Client';

class AddTicket extends Component {

  state = {
    accountName: "",
    contact: "",
    status: "",
    priority: "",
    issueType: "",
    primaryResource: "" ,
    ticketTitle:"",
    ticketDescription: "",
    isSubmitSuccessful: false,  
  }

  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }  

  getClient(client){    
    this.setState({accountName:client})    
  }

  getTech(technician){
    this.setState({ primaryResource: technician})
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
    //console.log("add ticket comp: ",this.state)
    return(
      <section>
        <h2> Add Ticket</h2>
        <form onSubmit={ event => this.handleSubmit(event) } >
          <label> Account Name: </label>
          <DropdownClient sendUser={ user => this.getClient(user) }  />
          <br />

          <label> Contact: </label>
          <input 
              value = { this.state.contact }
              onChange={ e => this.genericSync(e) }
              type = "text"
              name = "contact"
              placeholder = ""
          />
          <br />

          <label> Status: </label>
          <select value={ this.state.status } name="status" onChange= { event => this.genericSync(event) } >
                  <option value="--Select Status--" >--Select Status-- </option>
                  <option value="New"  > New </option>
                  <option value="In Progress" > In Progress </option>
                  <option value="Waiting on Customer" > Waiting on Customer </option>
                  <option value="Complete" > Complete </option>
          </select>
          <br />

          <label> Priority: </label>
          <select value={ this.state.priority } name="priority" onChange= { event => this.genericSync(event) } >
                  <option value="--Select Priority--" >--Select Priority-- </option>
                  <option value="Low"> Low </option>
                  <option value="Medium"> Medium </option>  
                  <option value="High"> High </option>                
          </select>
          <br />

          <label> Issue Type: </label>
          <select value={ this.state.issueType } name="issueType" onChange= { event => this.genericSync(event) } >
                  <option value="--Select Issue Type--" >--Select Issue Type-- </option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Hardware"> Hardware </option>  
                  <option value="Software"> Software </option> 
                  <option value="User Administration"> User Administration </option>               
          </select>
           <br />

          <label> Primary Resource: </label> 
          <DropdownResource sendUser={ user => this.getTech(user) }  />
          <br /> 

           <label> Ticket Title: </label>
            <input 
              value = { this.state.ticketTitle }
              onChange={ e => this.genericSync(e) }
              type = "text"
              name = "ticketTitle"
              placeholder = ""
           />
           <br />

          <label> Ticket Description: </label>
            <textarea 
              value = { this.state.ticketDescription }
              onChange={ e => this.genericSync(e) }
              type = "text"
              name = "ticketDescription"
              placeholder = ""
           />
           <br />
           <button>Submit</button>        
        
        </form>
      </section>
    )
  }



}

export default AddTicket;