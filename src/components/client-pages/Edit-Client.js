import React, { Component } from 'react';
import axios from "axios";

import StatesData from '../../data/states.json'

class EditClient extends Component {  
  state = {
      accountName: "",
      address: "",
      city:"",
      state:"",
      zipCode:"",
      phone: "",
      active: false        
  }  
  //Sync data from form controls
  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  //Update state of checkbox
  toggleChange = () => {
    this.setState({
      active: !this.state.active      
    });    
  }

  //Load form data 
  componentDidMount() {
    const { match: { params } } = this.props;    
    axios.get(`${process.env.REACT_APP_API_URL}/clients/clientListEdit/${params.clientId}`)
      .then(response => {      
        // update our state array with the data from the API
        this.setState({ 
            accountName: response.data.data.accountName,
            address: response.data.data.address,
            city: response.data.data.city,
            state: response.data.data.state,
            zipCode: response.data.data.zipCode,
            phone:response.data.data.phone,
            active: response.data.data.active
        });      
      })
      .catch(err =>  console.log(err));
  }

  handleSubmit(event) {    
    event.preventDefault(); 
    const { match: { params } } = this.props;      
    axios.put(     
      `${process.env.REACT_APP_API_URL}/clients/updateClient/${params.clientId}`,
         this.state,
        { withCredentials: true }
    )
      .then( response => {           
          this.props.history.push('/client-list');        
      })
      .catch( err => console.log(err) );     
  }  

  render(){    
    return(
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card rounded-0">
              <div className="card-header">
                  <h3 className="mb-0 my-2">Edit Client Profile</h3>
              </div>
          <div className="card-body">
            <form onSubmit={event => this.handleSubmit(event)}>
            <div className="form-group">
              <label>Account Name:</label>
              <input 
                  className = "form-control"
                  value = { this.state.accountName }
                  onChange={ e => this.genericSync(e) }
                  type = "text"
                  name = "accountName"              
              />
            </div>
                       
            <div className="form-group">
              <label>Address:</label>
              <input 
                  className = "form-control"
                  value = { this.state.address }
                  onChange={ e => this.genericSync(e) }
                  type = "text"
                  name = "address"              
              />
            </div>

            <div className="row">
                <div className= "col-md-8 mx-auto">
                  <div className="form-group ">
                    <label>City:</label>
                    <input 
                        className="form-control"
                        value = { this.state.city }
                        onChange={ e => this.genericSync(e) }
                        type = "text"
                        name = "city"                        
                    /> 
                  </div>
                </div>
                <div className= "col-md-4 mx-auto">
                  <div className="form-group">
                    <label>State:</label>
                    <select className="form-control" onChange={ event => this.genericSync(event) } value = {this.state.state} name="state"> 
                          <option>- Select State -</option>       
                        { StatesData.map(stateName => <option key={ stateName.name } value={ stateName.abbreviation }> { stateName.abbreviation } </option> ) }
                    </select>
                  </div> 
                </div>
            </div> 
              
            <div className="form-group">
              <label>Phone:</label>
              <input 
                  className = "form-control"
                  value = { this.state.phone }
                  onChange={ e => this.genericSync(e) }
                  type = "text"
                  name = "phone"              
              />
            </div>
            
            <div className="form-group-row">
              <label>Active:</label>
              <input 
                  className = "form-control-row ml-2"
                  type="checkbox"
                  name="active"
                  checked={this.state.active}
                  onChange={this.toggleChange}
              />
            </div>
              
              <button className="btn btn-secondary btn-lg btn-block">Update</button> 
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default EditClient;