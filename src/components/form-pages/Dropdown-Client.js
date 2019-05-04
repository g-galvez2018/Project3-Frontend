import React, { Component } from 'react';

import axios from 'axios';

class DropdownClient extends Component {
  state = {
    clients: [],
    singleClient: "",
  }

  genericSync(event) {    
    this.setState({ singleClient:event.target.value },() => this.sendUpdate());    
  }

  sendUpdate(){
    console.log(this.state)
    this.props.updateTheClient(this.state.singleClient)
  }

  componentDidMount(){
    axios.get("http://localhost:3001/clients/clientListApi", { withCredentials:true })
    .then(client =>  {  
      //console.log(techs.data.data)       
      this.setState ({clients:client.data.data})        
    });
  }

    render () {  
     // console.log(this.state)
      return (
        <div className="drop-down">
            <select onChange={ e => this.genericSync(e) } value={this.state.singleClient}   name="singleClient">
                  <option>--Select Account Name--</option>
                { this.state.clients.map((client) => <option key={client._id} value={client.accountName}>{client.accountName}</option>) }
                
            </select>
        </div>
      ) 
    }
}

export default DropdownClient;