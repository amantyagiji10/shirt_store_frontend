import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { getACate, updateaCate } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name: "",
    error: "",
    formData: "",
  });

  const [Terror, setError] = useState(false);
  const [Tsuccess, setSuccess] = useState(false);

  const { name, error, formData } = values;

  const preload = (categoryId) => {
    getACate(categoryId).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
        });
      } else {
        setValues({
          ...values,
          name: data.name,
          formData: new FormData(),
          error: "",
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  // const handleChange = (event) => {
  //   // const value = event.target.value;
  //   // formData.set(name, value);
  //   // setValues({ ...values, [name]: value });
  //   console.log(formData);
  // };
  // let sud;
  const handleChange = (name) => (event) => {
    const value = name === "name" ? event.target.value : "";
    formData.set(name, value);
    // console.log(value);
    setValues({ ...values, [name]: value, formData: new FormData() });
    // sud = value;
    // console.log(sud);
  };

  const onsubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: "" });

    updateaCate(match.params.categoryId, user._id, token, { name })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
          });
          setSuccess(false);
          setError(true);
          //console.log(data.error);
        } else {
          setValues({
            name: "",
          });
          setSuccess(true);
          setError(false);
        }
      })
      .catch((err) => {
        console.log("its error", err);
      });
  };

  // console.log(formData);

  const delayRediect = () => {
    if (Tsuccess) {
      setTimeout(function () {
        window.location.href = "/admin/categories";
        //window.location.href = "/";
      }, 1000);
    }
  };

  const successMessage = () => {
    if (Tsuccess) {
      //return <h4 className="text-success">{name}</h4>

      return <h4 className="text-success">Category {name} Created Success</h4>;
    }
  };

  const warningMessage = () => {
    if (Terror)
      return (
        <h4 className="text-danger"> {error}Failed to Create Category!</h4>
      );
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
            name="name"
            onChange={handleChange("name")}
            value={name}
            required
            placeholder="For which you want"
          />
          <div className="row">
            <div className="col-md-8">
              <button className="btn btn-outline-info" onClick={onsubmit}>
                Update Ctegory
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
      title="Add a Product here!"
      description="Lets create some product"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-warning mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {delayRediect()}
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
        </div>
      </div>
    </Base>
  );
  //   const [name, setName] = useState("");
  //   //const [error, setError] = useState(false);
  //   //const [success, setSuccess] = useState(false);
  //   const { user, token } = isAutheticated();

  //   const [cate, setCate] = useState({
  //     name: "",
  //     loding: false,
  //     error: "",
  //     createdcategory: "",
  //     getRedirect: false,
  //     FormData: "",
  //   });

  //   const preload = (categoryId) => {
  //     getACate(categoryId).then((data) => {
  //       console.log(data);
  //       if (data.error) {
  //         setCate({ ...cate, error: data.error });
  //       } else {
  //         setCate({
  //           ...cate,
  //           name: data.name,
  //           formData: new FormData(),
  //           error: "",
  //         });
  //       }
  //     });
  //   };

  //   useEffect(() => {
  //     preload(match.params.categoryId);
  //   }, []);

  //   // const goBack = () => (

  //   // );
  //   const handleChange = (event) => {
  //     // setError("");
  //     setName(event.target.value);
  //     // setSuccess(false);
  //   };
  //   const onsubmit = (event) => {
  //     event.preventDefault();
  //     // setError("");
  //     // setSuccess(false);
  //     //backend req fired
  //     updateaCate(match.params.categoryId, user._id, token, cate.formData)
  //       .then((data) => {
  //         console.log(data);
  //         if (data.error) {
  //           setCate({ ...cate, error: data.error });
  //         } else {
  //           setCate({
  //             ...cate,
  //             name: "",
  //             loding: false,
  //             createdProduct: data.name,
  //             error: "",
  //           });
  //         }
  //       })
  //       .catch();
  //   };

  //   const successMessage = () => {
  //     // if (success) {
  //     //   //return <h4 className="text-success">{name}</h4>
  //     //   return <h4 className="text-success">{cate.name} updated Success</h4>;
  //     // }
  //   };

  //   const warningMessage = () => {
  //     //if (error)
  //     //return <h4 className="text-danger">Failed to Update Category!</h4>;
  //   };

  //   const myCategoryForm = () => {
  //     return (
  //       <form>
  //         <div className="form-group">
  //           <p className="lead ">Enter the Category</p>
  //           <input
  //             type="text"
  //             className="form-control my-3 col-9"
  //             autoFocus
  //             onChange={handleChange{name}}
  //             value={name}
  //             required
  //             placeholder="For which you want"
  //           />
  //           <div className="row">
  //             <div className="col-md-8">
  //               <button className="btn btn-outline-info" onClick={onsubmit}>
  //                 Update Ctegory
  //               </button>
  //               {/* go back function starts here */}
  //               <span className="ml-1">
  //                 <Link
  //                   className="btn btn-outline-warning  offset-2"
  //                   to="/admin/dashboard"
  //                 >
  //                   Go Home
  //                 </Link>
  //               </span>
  //               {/* go back function ends here */}
  //             </div>
  //           </div>
  //         </div>
  //       </form>
  //     );
  //   };

  //   return (
  //     <Base
  //       title="Create a Category"
  //       description="Add new Category for your tshirts"
  //       className="container bg-info p-4"
  //     >
  //       <div className="row bg-white rounded">
  //         <span className="col-md-8 offset-md-2">
  //           {successMessage()}
  //           {warningMessage()}
  //           {myCategoryForm()}
  //           {/* <span>{goBack()}</span> */}
  //         </span>
  //       </div>
  //     </Base>
  //   );
};

export default UpdateCategory;
