import React, { Component } from 'react';
import axios from 'axios';

class DropdownResource extends Component {
  state = {
    technicians: [],
    singleTech: "",
  }

  componentDidMount(){
    axios.get(`${process.env.REACT_APP_API_URL}/api/usersListApi?role=Technician`, { withCredentials:true })
    .then(techs =>  {              
      this.setState ({technicians:techs.data.data})        
    });
  }

  pickupUser(e){
    this.props.sendUser(e.target.value)
  }

  render (){
    const { technicians } = this.state;
    return (
      <div>
        <select className="form-control"onChange={ e => this.pickupUser(e) } value = {this.props.selectedTechnician} >
        <option>--Select Technician--</option>
        { technicians.map(user => <option key={ user._id } value={ user.fullName }> { user.fullName } </option> ) }
        </select>
      </div>
    )
  }  
}

export default DropdownResource;