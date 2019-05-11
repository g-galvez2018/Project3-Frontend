import React, { Component } from 'react';
import axios from 'axios';

class AddClient extends Component {
  state = {
    accountName:"",
    address1:"",
    Phone:"",
    active:false,    
    isSubmitSuccessful:false
  }
  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });    
  } 
  toggleChange = () => {
    this.setState({
      active: !this.state.active      
    });   
  }
  handleSubmit(event){
    event.preventDefault();
    console.log(this.state)
    axios.post(
        `${process.env.REACT_APP_API_URL}/clients/addClient`,
        this.state,
        { withCredentials: true }
    )
    .then( response => {
        console.log("new client: ", response.data);
        this.setState({ isSubmitSuccessful: true })
        this.props.history.push('/client-list')
    } )
    .catch( err => console.log(err) );
  }
  render(){
    return(
      <section className="row">
        <div className="col-md-6 mx-auto">
          <div className="card rounded-0">
            <div className="card-header">
                <h3 className="mb-0 my-2">Add Account</h3>
            </div>
          <div className="card-body">      
            <form onSubmit={event => this.handleSubmit(event)}>
              <div className="form-group">
                <label>Account Name:</label>
                <input 
                    className="form-control"
                    value = { this.state.accountName }
                    onChange={ e => this.genericSync(e) }
                    type = "text"
                    name = "accountName"
                    placeholder = ""
                />
              </div>                       
              <div className="form-group">
                <label>Address:</label>
                <input 
                    className="form-control"
                    value = { this.state.address1 }
                    onChange={ e => this.genericSync(e) }
                    type = "text"
                    name = "address1"
                    placeholder = ""
                /> 
              </div>            
              <div className="form-group">
                <label>Phone:</label>
                <input 
                    className="form-control"
                    value = { this.state.Phone }
                    onChange={ e => this.genericSync(e) }
                    type = "text"
                    name = "Phone"
                    placeholder = ""
                />  
              </div>            
              <div className="form-group-row">
                <label>Active:</label>
                <input 
                    className="form-control-row ml-2"
                    type="checkbox"
                    name="active"
                    checked={this.state.active}
                    onChange={this.toggleChange}
                />  
              </div>            
              <button className="btn btn-secondary btn-lg btn-block">Submit</button> 
            </form>
            </div>
        </div>
      </div>
    </section>
    )
  }

}

export default AddClient;