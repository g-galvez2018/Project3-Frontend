import React, { Component } from 'react';
import axios from "axios";

class EditUser extends Component {
  
  state = {
      fullName: "",
      email:"",
      status: "",
      role: "",             
  }
  //Update state of inputs
  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  componentDidMount() {
    const { match: { params } } = this.props;     
    axios.get(`${process.env.REACT_APP_API_URL}/api/profile/${params.userId}`)
    .then(response => {
      console.log("response",response.data.data);
      
      this.setState({ 
                      fullName: response.data.data.fullName,
                      email: response.data.data.email,
                      status:response.data.data.status,
                      role: response.data.data.role
                    });
      console.log(this.state)
    })
      .catch(err => {        
        alert("Sorry! Something went wrong.");
    });
  }
  handleSubmit(event) {    
    event.preventDefault(); 
    const { match: { params } } = this.props;
    console.log("pre-submit", this.state)  
    axios.put(     
        `${process.env.REACT_APP_API_URL}/api/updateUser/${params.userId}`,
         this.state,
        { withCredentials: true }
    )
    .then( response => {
        console.log("updated user: ", response.data.data);  
        this.props.history.push('/user-list')      
    } )
    .catch( err => console.log(err) );
     
  }

  render(){    
    return(
      <div className="row">
      <div className="col-md-6 mx-auto">
        <div className="card rounded-0">
            <div className="card-header">
                <h3 className="mb-0 my-2">Edit User Profile</h3>
            </div>
        <div className="card-body">      
            <form onSubmit={event => this.handleSubmit(event)}>
            <div className="form-group">
              <label>User Name:</label>
              <input 
                  className="form-control"
                  value = { this.state.fullName }
                  onChange={ e => this.genericSync(e) }
                  type = "text"
                  name = "fullName"              
              />
            </div>
                        
            <div className="form-group">
              <label>User Email:</label>
              <input 
                  className="form-control"
                  value = { this.state.email }
                  onChange={ e => this.genericSync(e) }
                  type = "text"
                  name = "email"              
              />
            </div>
              
            <div className="form-group">
              <label>Role:</label>
              <select className="form-control" value={ this.state.role } name="role" onChange= { event => this.genericSync(event) } >                  
                      <option value="Admin"> Admin </option>
                      <option value="Technician">Technician</option>
                      <option value="Client"> Client </option> 
              </select> 
            </div>

            <div className="form-group">
              <label>Status:</label>
              <select className="form-control" value={ this.state.status } name="status" onChange= { event => this.genericSync(event) } >                  
                      <option value="Pending">Pending</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option> 
              </select>
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

export default EditUser;