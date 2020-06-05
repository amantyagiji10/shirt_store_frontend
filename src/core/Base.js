import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My Description",
  className = "bg-dark text-white",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-6">{title}</h2>
        <p className="">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-dark">
      <div className="container-fluid bg-primary text-white text-center">
        <h5>If You have any question, fell free to react out!</h5>
        <div className="row offset-1">
          <button className="btn btn-warning btn-lg">Home</button>
          <button className="btn btn-warning btn-lg offset-1">
            Contact Us
          </button>
          <button className="btn btn-warning btn-lg offset-1">About Us</button>
          <button className="btn btn-warning btn-lg offset-1">
            Our Products
          </button>
          <button className="btn btn-success btn-lg offset-1">Login</button>
          <button className="btn btn-success btn-lg offset-1">Signup</button>
        </div>
      </div>
      <div className="container">
        <span className="text-muted">
          Hi there try my <span className="text-white">Store</span>
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
