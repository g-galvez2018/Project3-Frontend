import React, { Component } from 'react';
import axios from "axios";

class EditClient extends Component {
  
  state = {
      accountName: "",
      address1: "",
      Phone: "",
      active: false        
  }  

  //Update state of inputs
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

  componentDidMount() {
    const { match: { params } } = this.props;
    //console.log(params.clientId)  
    axios.get(`${process.env.REACT_APP_API_URL}/clients/clientListEdit/${params.clientId}`)
    .then(response => {
      console.log(response.data.data);
      // update our state array with the data from the API
      this.setState({ 
                      accountName: response.data.data.accountName,
                      address1: response.data.data.address1,
                      Phone:response.data.data.Phone,
                      active: response.data.data.active
                    });
      console.log(this.state)
    })
      .catch(err => {
        //console.log("Phone List ERROR", err);
        alert("Sorry! Something went wrong.");
    });
  }

  handleSubmit(event) {    
    event.preventDefault(); 
    const { match: { params } } = this.props;
    console.log("submit", this.state)  
    axios.put(     
      `${process.env.REACT_APP_API_URL}/clients/updateClient/${params.clientId}`,
         this.state,
        { withCredentials: true }
    )
    .then( response => {
        console.log("updated client: ", response.data);        
    } )
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
                  value = { this.state.address1 }
                  onChange={ e => this.genericSync(e) }
                  type = "text"
                  name = "address1"              
              />
            </div>
              
            <div className="form-group">
              <label>Phone:</label>
              <input 
                  className = "form-control"
                  value = { this.state.Phone }
                  onChange={ e => this.genericSync(e) }
                  type = "text"
                  name = "Phone"              
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