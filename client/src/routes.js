import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import config from "./components/config.js";
import Home from "./components/home";
import SignUp from "./components/signup";
import Forgot from "./components/forgot";
import Resetpassword from "./components/resetpassword";
import Verifyemail from "./components/verifyemail";
import Addproperty from "./components/addproperty";
import Editproperty from "./components/editproperty";
import Map from "./components/map";
import Crop from "./components/crop";
import About from "./components/about";
import Contact from "./components/contact";
import PrivacyPolicy from "./components/privacyPolicy";
import Termsofuse from "./components/termcondition";
import Propertydetail from "./components/property-detail";
import Propertylist from "./components/property-list";
import PropertylistTest from "./components/mylisting";
import Inbox from "./components/inbox";

import MyProfile from "./components/myprofile";
import ChangePasword from "./components/changepasword";
import CloseAcount from "./components/closeacount";
import EnquiryList from "./components/enquirylist";
import EnquiryListrenter from "./components/enquirylistrenter";
import BookingList from "./components/bookinglist";
import Transaction from "./components/transaction-list";
import WishList from "./components/wish-list";
import SavedsearchList from "./components/savedsearch-list";
import Success from "./components/success";
import cancel from "./components/error";
import error from "./components/notfound";
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      (localStorage.length > 0 && localStorage.getItem("status") == 1) ||
        localStorage.getItem("status") == 2 ? (
        jwt.verify(localStorage.getItem("Uid"), "pokemon", (err, decoded) => {
          if (err) {
            localStorage.clear();
            console.log("props", props);
            props.history.push("/");
          } else {
            return decoded;
          }
        }).email !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to="" />
        )
      ) : (
        <Redirect to="" />
      )
    }
  />
);
const PrivateRouteRenter = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.length > 0 && localStorage.getItem("status") == 1 ? (
        jwt.verify(localStorage.getItem("Uid"), "pokemon", (err, decoded) => {
          if (err) {
            localStorage.clear();
            console.log("props", props);
            props.history.push("/");
          } else {
            return decoded;
          }
        }).email !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to="" />
        )
      ) : (
        <Redirect to="" />
      )
    }
  />
);
class Routes extends React.Component {

  componentDidMount() {
    setTimeout(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;

    }, 300)
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/resetpassword.html" component={Resetpassword} />
          <Route path="/signup.html" component={SignUp} />
          <Route path="/forgot.html" component={Forgot} />
          <Route path="/verifyemail.html" component={Verifyemail} />
          <PrivateRouteRenter
            path="/addproperty.html"
            component={Addproperty}
          />
          <PrivateRouteRenter
            path="/editproperty.html"
            component={Editproperty}
          />
          <Route path="/detailproperty.html" component={Propertydetail} />
          <Route path="/listproperty.html" component={Propertylist} />
          <PrivateRoute path="/transaction.html" component={Transaction} />
          <PrivateRoute
            path="/propertylist.html"
            component={PropertylistTest}
          />
          <PrivateRoute path="/inbox.html" component={Inbox} />
          <Route path="/map.html" component={Map} />
          <Route path="/crop.html" component={Crop} />
          <Route path="/about.html" component={About} />
          <Route path="/contact.html" component={Contact} />
          <Route path="/privacyPolicy.html" component={PrivacyPolicy} />
          <Route path="/termsofuse.html" component={Termsofuse} />
          <PrivateRoute path="/myprofile.html" component={MyProfile} />
          <PrivateRoute path="/success.html" component={Success} />
          <PrivateRoute path="/cancel.html" component={cancel} />
          <PrivateRoute path="/changepasword.html" component={ChangePasword} />
          <PrivateRoute path="/closeacount.html" component={CloseAcount} />
          <PrivateRoute path="/enquirylist.html" component={EnquiryList} />
          <PrivateRoute
            path="/enquirylistrenter.html"
            component={EnquiryListrenter}
          />

          <PrivateRoute path="/bookinglist.html" component={BookingList} />
          <PrivateRoute path="/wishlist.html" component={WishList} />
          <PrivateRoute
            path="/savedsearchList.html"
            component={SavedsearchList}
          />
          <Route component={error} />
        </Switch>
      </div>
    );
  }
}
export default Routes;
