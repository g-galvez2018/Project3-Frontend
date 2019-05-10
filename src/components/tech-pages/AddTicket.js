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
      `${process.env.REACT_APP_API_URL}/tickets/addTicket`,
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
        <div className="row">
          <div className="col-md-9 mx-auto">
          <div className="card rounded-0">
              <div className="card-header">
                  <h3 className="mb-0 my-2">Add Ticket</h3>
              </div>
          <div className="card-body"> 
          <form onSubmit={ event => this.handleSubmit(event) } > 
            <div className="row">
              <div className="col-md-4 mx-auto">            
                <div className="form-group">
                    <label> Account Name: </label>                  
                    <DropdownClient sendUser={ user => this.getClient(user) } className="form-control"  />
                  </div>                
                  <div className="form-group">
                      <label> Contact: </label>
                      <input 
                        className="form-control"
                        value = { this.state.contact }
                        onChange={ e => this.genericSync(e) }
                        type = "text"
                        name = "contact"
                        placeholder = ""
                      />
                  </div>
                  <div className="form-group"> 
                      <label> Status: </label>
                      <select className="form-control" value={ this.state.status } name="status" onChange= { event => this.genericSync(event) } >
                              <option value="--Select Status--" >-- Select Status -- </option>
                              <option value="New"> New </option>
                              <option value="In Progress" > In Progress </option>
                              <option value="Waiting on Customer" > Waiting on Customer </option>
                              <option value="Complete" > Complete </option>
                      </select>
                  </div>
                  <div className="form-group"> 
                      <label> Priority: </label>
                      <select className="form-control" value={ this.state.priority } name="priority" onChange= { event => this.genericSync(event) } >
                              <option value="--Select Priority--" >-- Select Priority --</option>
                              <option value="Low"> Low </option>
                              <option value="Medium"> Medium </option>  
                              <option value="High"> High </option>                
                      </select>
                  </div>
                  <div className="form-group">
                    <label> Issue Type: </label>
                    <select className="form-control" value={ this.state.issueType } name="issueType" onChange= { event => this.genericSync(event) } >
                            <option value="--Select Issue Type--" >-- Select Issue Type -- </option>
                            <option value="Infrastructure">Infrastructure</option>
                            <option value="Hardware"> Hardware </option>  
                            <option value="Software"> Software </option> 
                            <option value="User Administration"> User Administration </option>               
                    </select>
                </div>
                  <div className="form-group"> 
                  <label> Primary Resource: </label> 
                  <DropdownResource sendUser={ user => this.getTech(user) }  />
              </div>
                </div>
                <div className="col-md-8 mx-auto"> 
                  <div className="form-group"> 
                    <label> Ticket Title: </label>
                      <input className="form-control"
                        value = { this.state.ticketTitle }
                        onChange={ e => this.genericSync(e) }
                        type = "text"
                        name = "ticketTitle"
                        placeholder = ""
                    />
                  </div>  
                  <div className="form-group"> 
                    <label> Ticket Description: </label>
                      <textarea className="form-control z-depth-1"
                        value = { this.state.ticketDescription }
                        onChange={ e => this.genericSync(e) }
                        rows="10"
                        type = "text"
                        name = "ticketDescription"
                        placeholder = "Add Ticket Summary"
                    />
                  </div>           
                </div>
              <button className="btn btn-secondary btn-lg btn-block">Submit</button>        
              </div>
          </form>
        </div>
      </div>
      </div>
    </div>
     
    )
  }



}

export default AddTicket;