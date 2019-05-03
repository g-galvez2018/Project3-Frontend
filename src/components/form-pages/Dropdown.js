import React, { Component } from 'react';

import axios from 'axios';

class Dropdown extends Component {
  state = {
    technicians: [],
  }

  componentDidMount(){
    axios.get("http://localhost:3001/api/usersListApi?role=Technician", { withCredentials:true })
    .then(techs =>  {         
      this.setState ({technicians:techs.data.data})        
    });
  }

    render () {  
      return (
        <div className="drop-down">
            <select>
                { this.state.technicians.map((techs) => <option key={techs._id} >{techs.fullName}</option>) }
            </select>
        </div>
      ) 
    }
}

export default Dropdown;