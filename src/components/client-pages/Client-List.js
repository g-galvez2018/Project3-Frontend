import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class ClientList extends Component {
    state = {
      clientArray:[]
    }    

    componentDidMount() {
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
        <section className="row">
         <div className="col-md-9 mx-auto">
          <h2> Clients </h2>
              <p>Currently we have: { clientArray.length } clients.</p>
              <table className="table table-sm table-hover">
              <thead>
                <tr>
                  <th scope="col">Account Name</th>
                  <th scope="col">Address</th> 
                  <th scope="col">City</th>
                  <th scope="col">State</th>
                  <th scope="col">Zip Code</th>
                  <th scope="col">Phone</th>  
                  <th scope="col">Action</th>              
                </tr>
             </thead>
            <tbody>              
                { clientArray.map((oneClient) => {
                  return(
                    <tr key={ oneClient._id }>
                        <td> {oneClient.accountName} </td>
                        <td> {oneClient.address} </td>
                        <td> {oneClient.city} </td>
                        <td> {oneClient.state} </td>
                        <td> {oneClient.zipCode} </td>
                        <td> {oneClient.phone} </td>                        
                        <td><Link to={`/edit-client/${oneClient._id}`}>
                          <button className="btn btn-secondary btn-sm">Edit</button>  
                          </Link>
                        </td>                                             
                    </tr>                  
                  )
                })}              
            </tbody>
          </table>
        </div>
      </section>
      )
    }
}

export default ClientList;

