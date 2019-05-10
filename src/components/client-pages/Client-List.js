import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class ClientList extends Component {
    state = {
      clientArray:[]
    }    

    componentDidMount() {
      // console.log(`${process.env.REACT_APP_API_URL}/clients/clientList`)
      // retrieve the info from the API as soon as the component loads
      axios.get(
        `${process.env.REACT_APP_API_URL}/clients/clientList`,
        
      { withCredentials: true } // FORCE axios to send cookies across domains
      )
      .then(response => {
          console.log("ClientList", response.data.data);
          // update our state array with the data from the API
          this.setState({ clientArray: response.data.data });
      })
      .catch(err => {
          console.log("Phone List ERROR", err);
          alert("Sorry! Something went wrong.");
      });
    }

    

    render(){
      const { clientArray } = this.state;
      return(
        <section>
          <h2> Clients </h2>
              <p>Currently we have: { clientArray.length } clients.</p>
              <ul>
                    { clientArray.map((oneClient) => {
                      return(
                        <li key={ oneClient._id }>
                            <Link to={`/edit-client/${oneClient._id}`}> 
                              { oneClient.accountName } 
                            </Link>
                        </li>                  
                      )
                    })}
              </ul>

        </section>
      )
    }
}

export default ClientList;

