import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class UserList extends Component {
    state = {
      userArray:[]
    }   

    componentDidMount() {
      // retrieve the info from the API as soon as the component loads
      axios.get(
        `${process.env.REACT_APP_API_URL}/api/usersList`,
        // { withCredentials: true } // FORCE axios to send cookies across domains
      )
      .then(response => {
          console.log("UserList front = = =", response.data.data);
          // update our state array with the data from the API
          this.setState({ userArray: response.data.data });
      })
      .catch(err => {
          console.log("User List ERROR", err.response);
          alert("Sorry! Something went wrong.");
      });
    }    

    render(){
      const { userArray } = this.state;
      return(
        <section>
          <h2> Users </h2>
              <p>Currently we have: { userArray.length } users.</p>
              <ul>
                    { userArray.map((oneUser) => {
                      return(
                        <li key={ oneUser._id }>
                            <Link to={`/edit-user/${oneUser._id}`}> 
                              { oneUser.fullName } 
                            </Link>
                        </li>                  
                      )
                    })}
              </ul>

        

            <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Full Name</th>
                <th scope="col">Email Address</th>                
              </tr>
            </thead>
            <tbody>
                    { userArray.map((oneUser) => {
                      return(
                        <tr key={ oneUser._id }>
                            <td> 
                                <Link to={`/edit-user/${oneUser._id}`}> 
                                  { oneUser.fullName } 
                                </Link>
                            </td>
                            <td> 
                                <Link to={`/edit-user/${oneUser._id}`}> 
                                  { oneUser.email } 
                                </Link>
                            </td>
                            <td>
                              
                            </td>
                        </tr>                  
                      )
                    })}             
              
            </tbody>
            </table>
        </section>
      )
    }
}

export default UserList;