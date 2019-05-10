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
    } )
    .catch( err => console.log(err) );
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
              placeholder = ""
           />
           <br />          

          <label>Address:</label>
          <input 
              value = { this.state.address1 }
              onChange={ e => this.genericSync(e) }
              type = "text"
              name = "address1"
              placeholder = ""
           />
           <br />

          <label>Phone:</label>
          <input 
              value = { this.state.Phone }
              onChange={ e => this.genericSync(e) }
              type = "text"
              name = "Phone"
              placeholder = ""
           />
           <br />

          <label>Active:</label>
          <input 
              type="checkbox"
              name="active"
              checked={this.state.active}
              onChange={this.toggleChange}
          />
          <br />
          <button>Submit</button> 
        </form>

      </section>
    )
  }

}

export default AddClient;