import React, { Component } from 'react';

import axios from 'axios';

class DropdownResource extends Component {
  state = {
    technicians: [],
    singleTech: "",
  }

  genericSync(event) {
    
    this.setState({ singleTech:event.target.value },() => this.sendUpdate());
    
    
  }

  sendUpdate(){
    console.log(this.state)
    this.props.updateTheParent(this.state.singleTech)
  }

  componentDidMount(){
    axios.get("http://localhost:3001/api/usersListApi?role=Technician", { withCredentials:true })
    .then(techs =>  {  
      //console.log(techs.data.data)       
      this.setState ({technicians:techs.data.data})        
    });
  }

    render () {  
     // console.log(this.state)
      return (
        <div className="drop-down">
            <select onChange={ e => this.genericSync(e) } value={this.state.singleTech}   name="singleTech">
                  <option>--Select Resouce--</option>
                { this.state.technicians.map((techs) => <option key={techs._id} value={techs.fullName}>{techs.fullName}</option>) }
                
            </select>
        </div>
      ) 
    }
}

export default DropdownResource;