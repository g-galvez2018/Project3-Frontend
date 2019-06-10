import React, { Component } from 'react';
import axios from 'axios';
import DropdownResource from '../form-pages/Dropdown-Resource';
import DropdownClient from '../form-pages/Dropdown-Client';


class EditTicket extends Component {

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

  componentDidMount() {
    const { match: { params } } = this.props;
    
    axios.get(`${process.env.REACT_APP_API_URL}/tickets/ticketEdit/${params.ticketId}`)
    .then(response => {      
      this.setState({ 
          accountName: response.data.data.accountName,
          contact: response.data.data.contact,
          status: response.data.data.status,
          priority: response.data.data.priority,
          issueType:response.data.data.issueType,
          primaryResource:response.data.data.primaryResource,
          ticketTitle:response.data.data.ticketTitle,
          ticketDescription:response.data.data.ticketDescription,
          ticketSolution: response.data.data.ticketSolution,
          ticketId: response.data.data.ticketId
      });      
    })
      .catch(err => {
        //console.log("Phone List ERROR", err);
        alert("Sorry! Something went wrong.");
    });
  }

  handleSubmit(event){
    event.preventDefault();
    const { match: { params } } = this.props;
    console.log("pre-submit", this.state) 
    axios.put(
      `${process.env.REACT_APP_API_URL}/tickets/updateTicket/${params.ticketId}`,
        this.state,
        { withCredentials: true }
    )
    .then( response => {
        console.log("updated ticket: ", response.data);
        this.setState({ isSubmitSuccessful: true })
        this.props.history.push('/view-ticket'); 
    } )
    .catch( err => console.log(err) );
  }

  render(){
      return(
        <div className="row">
          <div className="col-md-12 mx-auto">
          <div className="card rounded-0">
              <div className="card-header">
                  <h3 className="mb-0 my-2">Ticket # {this.state.ticketId}</h3>
              </div>
          <div className="card-body"> 
          <form onSubmit={ event => this.handleSubmit(event) } > 
            <div className="row">
              <div className="col-md-4 mx-auto">            
                <div className="form-group">
                    <label> Account Name: </label>                  
                    <DropdownClient sendUser={ user => this.getClient(user) } clientSelected={ this.state.accountName} className="form-control"  />
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
                  <DropdownResource sendUser={ user => this.getTech(user) } selectedTechnician = {this.state.primaryResource}  />
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
                        rows="6"
                        type = "text"
                        name = "ticketDescription"
                        placeholder = "Add Ticket Summary"
                    />
                  </div> 
                  <div className="form-group"> 
                    <label> Solution: </label>
                      <textarea className="form-control z-depth-1"
                        value = { this.state.ticketSolution }
                        onChange={ e => this.genericSync(e) }
                        rows="6"
                        type = "text"
                        name = "ticketSolution"
                        placeholder = "Add Ticket Solution"
                    />
                  </div>              
                </div>
              <button className="btn btn-secondary btn-lg btn-block">Update Ticket</button>        
              </div>
          </form>
        </div>
      </div>
      </div>
    </div>
     
    )
  }
}

export default EditTicket;