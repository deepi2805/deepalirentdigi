import React from "react";
import { Link, withRouter } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import $ from "jquery";
import jwt from "jsonwebtoken";
import config from "./config.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class Termsofuse extends React.Component {
  render() {
    return (
      <body class="loginSignup">
        <Header />
        <ToastContainer />
        <div class="loginLogoCol d-none d-lg-inline-block">
          <a href="javascript:void(0)">
            <img src="images/logo.png" alt="..." />
          </a>
        </div>
        <div class="centerBox">
          <div class="lContent">
            <div class="row g-0 h-100 align-items-center justify-content-center">
              <div class="loginSignContent">
                <div class="loginContent">
                  <div class="loginLogoCol d-lg-none">
                    <a href="javascript:void(0)">
                      <img src="images/logo.png" alt="..." />
                    </a>
                  </div>
                  <div class="mainHdng pdbtm-30">
                    <div class="mainHdngTitle">
                     <h2>
                        About<span>Us</span>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </body>
    );
  }
}
