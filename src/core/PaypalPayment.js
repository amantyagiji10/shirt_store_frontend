import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { getMeToken, processPayment } from "./helper/paypalHelper";
import { createOrder } from "./helper/orderHelper";
import { isAutheticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const PaypalPayment = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [info, setInfo] = useState({
    loding: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAutheticated() && isAutheticated().user._id;
  const token = isAutheticated() && isAutheticated().token;

  console.log(userId);
  console.log(token);

  const getbackendToken = (userId, token) => {
    getMeToken(userId, token).then((info) => {
      // console.log(userId);
      // console.log(token);
      console.log("information", info);
      if (clientInformation.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
        // or above or this setInfo({clientToken: clientToken})
      }
    });
  };

  const onPurchase = () => {
    setInfo({ loding: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };

      processPayment(userId, token, paymentData)
      .then((response) => {
        setInfo({ ...info, success: response.success, loading: false });
        console.log("PAYMENT SUCCESS");
        const orderData = {
          products: products,
          transaction_id: response.transaction.id,
          amount: response.transaction.amount,
        };
        createOrder(userId, token, orderData);
        cartEmpty(() => {
          console.log("Did we got a crash?");
        });

        setReload(!reload);
      })
        .catch((err) => {
          console.log("PAYMENT FAILED");
          setInfo({ loading: false, success: false });
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      return (amount = amount + p.price);
    });
    return amount;
  };

  const showBraintreeDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>
              Pay Here
            </button>
          </div>
        ) : (
          <h3>Please Login or Add something to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getbackendToken(userId, token);
  }, []);

  return (
    <div>
      <h4>Your Bill is {getAmount()}</h4>
      {showBraintreeDropIn()}
    </div>
  );
};

export default PaypalPayment;
