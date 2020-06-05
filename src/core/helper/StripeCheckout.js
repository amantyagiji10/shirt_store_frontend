import React, { useState, useEffect } from "react";
import { isAutheticated } from "../../auth/helper";
import { cartEmpty, loadCart } from "./cartHelper";
import { Link } from "react-router-dom";
import StripeCheckButton from "react-stripe-checkout";
import { API } from "../../backend";
import { createOrder } from "./orderHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loadig: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAutheticated() && isAutheticated().token;
  const userId = isAutheticated() && isAutheticated().user._id;

  // const getFinalPrice = () => {
  //   return products.reduce((currentValue, nextValue) => {
  //     return currentValue + nextValue.count * nextValue;
  //   }, 0);
  // };

  const getFinalAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  //helper Method
  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripePayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log("STATUS", status);
        cartEmpty();
      })
      .catch((err) => console.log(err));
  };

  const showstripeButton = () => {
    return isAutheticated() ? (
      <StripeCheckButton
        stripeKey="pk_test_Xh5bczuDiP4dTRY2Ncx7wdcE001DWDe65i"
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy T-shirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay Here</button>
      </StripeCheckButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h1 className="text-white">Stripe checkout {getFinalAmount()} </h1>

      {showstripeButton()}
    </div>
  );
};

export default StripeCheckout;
