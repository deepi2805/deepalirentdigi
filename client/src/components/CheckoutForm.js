import React from "react";
import { Switch, Route, Redirect, Link, withRouter } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import config from "./config.js";
import $ from "jquery";
export const CheckoutForm = (id) => {
  console.log("data stripe", id.key1.price);
  const stripe = useStripe();
  const elements = useElements();
  const id1 = id;

  const handleSubmit = async (event) => {
    event.preventDefault();
    // $(".myloader").css("display", "block");
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;

        const test1 = {
          price: id1.key1.price,
          propertyType: id1.key1.propertyType,
          userId: id1.key1.userId,
          propertyId: id1.key1.primaryId,
        };
        const response = await axios.post(
          config.googleAuth.backURL + "user/add_property_transaction",
          {
            amount: id1.key1.price,
            payment_method: id,
            data: id1.key1,
            data1: test1,
          }
        );
        console.log("Stripe 35 | data", response.data.status);
        if (response.data.status) {
          console.log("CheckoutForm.js 25 | payment successful!");
          console.log(response.data);
          //
          if (id1.key1.propertyType == 0) {
            window.location.href =
              "success.html?id=" +
              response.data.data +
              "&uid=" +
              id1.key1.userId +
              "&status=" +
              id1.key1.propertyType;
          } else {
            window.location.href =
              "success.html?id=" +
              id1.key1.primaryId +
              "&status=" +
              id1.key1.propertyType;
          }
        } else {
          window.location.href = "paymentCancel.html";
        }
      } catch (error) {
        window.location.href = "error.html";
        console.log("CheckoutForm.js 28 | ", error);
      }
    } else {
      //alert('Payment Declined !')
      console.log(error.message);
    }
  };
  //alert(id.price);
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <CardElement
        options={{
          style: {
            base: {
              color: "#000",
              fontWeight: 600,
              fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
              fontSize: "15px",
              fontSmoothing: "antialiased",

              border: "2px solid red",
            },
            invalid: {
              color: "green",
              width: "100 %",
              padding: "12px 20px",
              margin: "8px 0",
            },
          },
        }}
      />

      <button class="btn btn-common btn-greenDark btn-round btn-big">
        Pay <b id="maintotal"></b>{" "}
        <i class="fa fa-angle-double-right" aria-hidden="true"></i>
      </button>
    </form>
  );
};
