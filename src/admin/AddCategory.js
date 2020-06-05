import React, { useState } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAutheticated();

  // const goBack = () => (

  // );
  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
    setSuccess(false);
  };
  const onsubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    //backend req fired
    createCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(true);
          setName("");
          setSuccess(false);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const delayRediect = () => {
    if (success) {
      setTimeout(function () {
        window.location.href = "/admin/create/product";
        //window.location.href = "/";
      }, 1000);
    }
  };

  const successMessage = () => {
    if (success) {
      //return <h4 className="text-success">{name}</h4>

      return <h4 className="text-success">Category Created Success</h4>;
    }
  };

  const warningMessage = () => {
    if (error)
      return <h4 className="text-danger">Failed to Create Category!</h4>;
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead ">Enter the Category</p>
          <input
            type="text"
            className="form-control my-3 col-9"
            autoFocus
            onChange={handleChange}
            value={name}
            required
            placeholder="For which you want"
          />
          <div className="row">
            <div className="col-md-8">
              <button className="btn btn-outline-info" onClick={onsubmit}>
                Create Ctegory
              </button>
              {/* go back function starts here */}
              <span className="ml-1">
                <Link
                  className="btn btn-outline-warning  offset-2"
                  to="/admin/dashboard"
                >
                  Go Home
                </Link>
              </span>
              {/* go back function ends here */}
            </div>
          </div>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create a Category"
      description="Add new Category for your tshirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <span className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {delayRediect()}
          {/* <span>{goBack()}</span> */}
        </span>
      </div>
    </Base>
  );
};

export default AddCategory;
