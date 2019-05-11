import React, { Component } from "react";

class Home extends Component {
   render (){
       return (
           <section className="row">
             <div className= "col-md-12 mx-auto">               
               <h1 className="text-center" > Welcome to IronTask </h1>
               <img className="rounded mx-auto d-block" src="https://res.cloudinary.com/dzhbvaunu/image/upload/v1557556314/IronTask/IronTask-Logo.png" alt="" />
            </div>
           </section>
       )
   }

}

export default Home;