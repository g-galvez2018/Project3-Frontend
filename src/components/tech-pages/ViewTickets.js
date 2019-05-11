import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class ViewTickets extends Component {
    state = {
      ticketsArray:[]
    }    

    componentDidMount() {
      axios.get(
        `${process.env.REACT_APP_API_URL}/tickets/ticketsList`,
        
      { withCredentials: true } // FORCE axios to send cookies across domains
      )
      .then(response => {
          console.log("TicketList", response.data.data);
          // update our state array with the data from the API
          this.setState({ ticketsArray: response.data.data });
      })
      .catch(err => {
          alert("Sorry! Something went wrong.");
      });
    }    

    render(){
      const { ticketsArray } = this.state;
      return(
        <section className="row">
         <div className="col-md-12 mx-auto">
          <h2> Tickets </h2>
              <p>Currently we have: { ticketsArray.length } tickets.</p>
              <table className="table table-sm table-hover">
              <thead>
                <tr>
                  <th scope="col">Ticket #</th>
                  <th scope="col">Account Name</th> 
                  <th scope="col">Contact</th>  
                  <th scope="col">Primary Resource</th>
                  <th scope="col">Action</th>               
                </tr>
             </thead>
            <tbody>              
                { ticketsArray.map((oneTicket) => {
                  return(
                    <tr key={ oneTicket._id }>
                        <td> {oneTicket.ticketId} </td>
                        <td> {oneTicket.accountName} </td>
                        <td> {oneTicket.contact} </td>
                        <td> {oneTicket.primaryResource} </td>                        
                        <td><Link to={`/edit-ticket/${oneTicket._id}`}>
                          <button className="btn btn-secondary btn-sm">Update Ticket</button>  
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

export default ViewTickets;