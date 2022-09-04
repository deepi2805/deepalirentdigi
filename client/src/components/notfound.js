import React from "react";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import Header from "./header";
import Footer from "./footer";
const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

export default class NotFound extends React.Component {
  render() {
    return (
      <div class="body">
        {/*  <Header /> */}

        <section class="wrapper py-2">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-md-5">
                <div class="errorCol  radius10 text-center ">
                  <div class="erroInrImg">
                    <img src="images/notfound.jpg" />
                  </div>
                  <div class="errorContent ">
                    <h2 class="pb-4">Page Not Found</h2>
                    <p>
                      The page you are looking for might have been removed had
                      its name changed or is temporarily unavailable
                    </p>
                    <div class="py-5">
                      <Link to="" class="comn-btn blu ">
                        BACK TO HOME
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*  <Footer /> */}
      </div>
    );
  }
}
