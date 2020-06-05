import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  // setReload = function(f){return f} === f=> f
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);

  const [count, setCount] = useState(product.count);

  const cardTitle = product
    ? product.name
    : "A photo From Hitesh's sir Collection";

  const cardDescription = product
    ? product.description
    : "A photo desc From Hitesh's sir Collection";

  const cardPrice = product
    ? product.price
    : "A photo price(free) From Hitesh's sir Collection";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showremoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload); //on click only it reload
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <div className="rounded border border-success p-2">
          {/* TODO: image from DB */}
          <ImageHelper product={product} />
        </div>
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice} </p>
        <div className="row">
          <div className="col-12">{showAddToCart(addtoCart)}</div>
          {/* <div className="col-12">{showAddToCart(addtoCart = true)}</div>  another way to do  */}
          <div className="col-12">{showremoveFromCart(removeFromCart)}</div>
          {/* <div className="col-12">{showremoveFromCart(removeFromCart = false)}</div> another way to do */}
        </div>
      </div>
    </div>
  );
};
export default Card;
