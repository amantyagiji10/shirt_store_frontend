import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base.js";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./helper/StripeCheckout";
import PaypalPayment from "./PaypalPayment";

const Cart = () => {
  // console.log("API is", API);

  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart);
  }, [reload]); //it force fully updates the page if there are some changes

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>Section To Load Products</h2>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              addtoCart={false}
              removeFromCart={true}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <div>
        <h2>Section To Checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart page" description="Ready To Checkout">
      <div className="row ">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No Products in Carts</h3>
          )}
        </div>
        <div className="col-6">
          <StripeCheckout products={products} setReload={setReload} />
          <br />
          <br />
          <br />
          <PaypalPayment products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
