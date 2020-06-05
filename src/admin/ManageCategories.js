import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { deleteaCate, getCategories } from "./helper/adminapicall";

const ManageCategories = () => {
  const [cate, setCate] = useState([]);

  const { user, token } = isAutheticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCate(data);
      }
    });
  };

  const deleteThisCate = (cateId) => {
    deleteaCate(cateId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Welcome admin" description="Manage your cate here">
      <h2 className="mb-4">All categories:</h2>
      <Link className="btn btn-info mx-1" to={`/admin/dashboard`}>
        <span className="col-2">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3 mb-1">Total Cate</h2>

          {cate.map((cate, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{cate.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/category/update/${cate._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  {/* we use call back which is given on on click
                 when we pass something in any function in react
                 react does not allow to directly pass variables
                 to the functions [{function (var a)} - wrong]
                   [() => {function(var a)} - correct] [{function} - correct]
                 instead we need to call the function in callback 
                */}
                  <button
                    onClick={() => {
                      //console.log(cate._id);
                      deleteThisCate(cate._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
