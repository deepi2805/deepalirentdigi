import React,{Suspense} from 'react'
import Header from './header'
import Footer from './footer'
import {Switch,Route,Redirect,Link} from 'react-router-dom';
import config from "./config.js"
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { CardElement,injectStripe,StripeProvider,Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaypalExpressBtn from 'react-paypal-express-checkout'
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

class Payment extends React.Component{
 state={
       client:{
        sandbox:    'AdWNq6w2vH9vieLBv9mykr9Lm_MYoiasck2OPK9qFdrRLhGnjD5zGhKkLMDk3Hb_naITHy_XwURoQt6Y',
        production: 'AdWNq6w2vH9vieLBv9mykr9Lm_MYoiasck2OPK9qFdrRLhGnjD5zGhKkLMDk3Hb_naITHy_XwURoQt6Y',
       },
       currency:"INR",
       amount:100,

    }
    //stripe
    handleChange = ({error}) => {
    if (error) {
      this.setState({errorMessage: error.message});
    }
  };
    handleSubmit = async (event) => {
     
    // Block native form submission.
    event.preventDefault();
if (this.props.stripe) {
      this.props.stripe.createToken().then(this.props.handleResult);
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
    
  };
//paypal
  changedata=(e)=>{
    this.setState({[e.target.name]:e.target.value.toLowerCase()})
    console.log(this.state.username)
  
  }
    onSuccess = (payment) => {
        // Congratulation, it came here means everything's fine!
                console.log("The payment was succeeded!", payment);
                // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
    }

    onCancel = (data) => {
        // User pressed "cancel" or close Paypal's popup!
        console.log('The payment was cancelled!', data);
        // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    }

    onError = (err) => {
        // The main Paypal's script cannot be loaded or somethings block the loading of that script!
        console.log("Error!", err);
        // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
        // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    }
    
  render(){
    var q=0;
    const {stripe} = this.props;
    return(
      <div>
      <form onSubmit={this.handleSubmit}>
     <Elements stripe={stripePromise}>
      <CardElement
  options={{
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  }}
/>
<button type="submit" >Pay</button>
    </Elements>
</form>

        <h2>Paypal Payment Gateway</h2>
            <PaypalExpressBtn
            env="sandbox"
            client={this.state.client}
            currency={this.state.currency}
            total={this.state.amount}
            onError={this.onError}
             onSuccess={this.onSuccess}
              onCancel={this.onCancel} />
      
  </div>
      )
  }
}

export default Payment


