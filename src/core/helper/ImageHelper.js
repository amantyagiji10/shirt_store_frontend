import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : `https://images.pexels.com/photos/1739941/pexels-photo-1739941.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`;
  return (
    <img
      src={imageurl}
      alt="its ours"
      style={{ maxHeight: "100%", maxWidth: "100%" }}
      className="mb-3 rounded"
    />
  );
};

export default ImageHelper;
