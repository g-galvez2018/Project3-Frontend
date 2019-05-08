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
    axios.get(`http://localhost:3001/clients/clientListEdit/${params.clientId}`)
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
        `http://localhost:3001/clients/updateClient/${params.clientId}`,
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