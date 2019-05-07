import React, { Component } from 'react';

import axios from 'axios';

class DropdownClient extends Component {
  state = {
    clients: [],
    singleClient: "",
  }

  componentDidMount(){
    axios.get("http://localhost:3001/clients/clientListApi", { withCredentials:true })
    .then(client =>  {            
      this.setState ({clients:client.data.data})        
    });
  }

  pickupUser(e){
    this.props.sendUser(e.target.value)
  }

  render (){
    const { clients } = this.state;
    return (
      <div>
        <select onChange={ e => this.pickupUser(e) } >
        <option>--Select Account Name--</option>
        { clients.map(user => <option key={ user._id } value={ user.accountName }> { user.accountName } </option> ) }
        </select>
      </div>
    )
  }  
} 



export default DropdownClient;