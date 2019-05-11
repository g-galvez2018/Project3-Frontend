import React from 'react';
import { NavLink} from "react-router-dom";

const Footer = () => {
  return(
    <footer className="page-footer font-small unique-color-dark mt-5">
        <div style={{backgroundColor: '#f1f1f2'}}>
          <div className="container">
            <div className="row py-4 d-flex align-items-center">
              <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                <h6 className="mb-0">Get connected with us on social networks!</h6>
              </div>
              <div className="col-md-6 col-lg-7 text-center text-md-right">
                <NavLink className="fb-ic" to="#" style={{textDecoration:"none", color:"black" }}>
                  <i className="fab fa-facebook-f white-text mr-4"> </i>
                </NavLink>
                <NavLink className="tw-ic" to="#" style={{textDecoration:"none", color:"black" }}>
                  <i className="fab fa-twitter white-text mr-4"> </i>
                </NavLink>
                <NavLink className="gplus-ic" to="#" style={{textDecoration:"none", color:"black" }}>
                  <i className="fab fa-google-plus-g white-text mr-4"> </i>
                </NavLink>
                <NavLink className="li-ic" to="#" style={{textDecoration:"none", color:"black" }}>
                  <i className="fab fa-linkedin-in white-text mr-4"> </i>
                </NavLink>
                <NavLink className="ins-ic" to="#" style={{textDecoration:"none", color:"black" }}>
                  <i className="fab fa-instagram white-text"> </i>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="container text-center text-md-left mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase font-weight-bold">G-Store</h6>
              <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: 60}} />
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
            
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 footer-links">
              <h6 className="text-uppercase font-weight-bold">Useful links</h6>
              <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: 60}} />
              <p>
                <NavLink to="#!" style={{textDecoration:"none", color:"black" }}>Your Account</NavLink>
              </p>
              <p>
                <NavLink to="#!" style={{textDecoration:"none", color:"black" }}>Latest Release Notes</NavLink>
              </p>
              <p>
                <NavLink to="#!" style={{textDecoration:"none", color:"black" }}>System Status</NavLink>
              </p>
              <p>
                <NavLink to="#!" style={{textDecoration:"none", color:"black" }}>Help</NavLink>
              </p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase font-weight-bold">Contact</h6>
              <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: 60}} />
              <p>
                <i className="fas fa-home mr-3" /> Miami, FL 33025, US</p>
              <p>
                <i className="fas fa-envelope mr-3" /> info@irontask.com</p>
              <p>
                <i className="fas fa-phone mr-3" /> + 01 305 965 8888</p>
              <p>
                <i className="fas fa-print mr-3" /> + 01 305 965 8989</p>
            </div>
          </div>
        </div>
        <div className="footer-copyright text-center py-3 nav-item">© 2019 Copyright:
          <NavLink className="nav-item" to="https://gstore-ironhack.herokuapp.com/" style={{textDecoration:"none", color:"black" }}> IronTask </NavLink>
        </div>
    </footer>

  )
}

  export default Footer;