import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "./CheckoutForm";

const PUBLIC_KEY =
  "pk_test_51ImzaVCgQKBY5pNoZhlyvmPtCLH9grIPWlQfjadWoczgqqQyL4fJfrTNfcwHafiGvwfNPckZABQ0aODy06CEDUcx00e5ZRzHel";

const stripeTestPromise = loadStripe(PUBLIC_KEY);
class Stripe extends React.Component {
  state = {
    price: this.props.key,
    data: this.props.key1,
  };
  componentDidMount() {
    console.log("helo", this.state);
  }
  render() {
    return (
      <Elements stripe={stripeTestPromise}>
        <CheckoutForm key={this.state.price} key1={this.state.data} />
      </Elements>
    );
  }
}
export default Stripe;
