// import React, { useState } from "react";
// import Base from "../core/Base";
// import { Link, Redirect } from "react-router-dom";

// import { signin, isAutheticated, authenticate } from "../auth/helper";

// const Signin = () => {
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//     error: "",
//     loding: false,
//     didredirect: false,
//   });

//   //destructuring from value.name to name from values
//   const { email, password, error, loading, didredirect } = values;
//   const user = isAutheticated();
//   //console.log("====================================");
//   // console.log(user);
//   //console.log("====================================");
//   //yaha sa user ka role pata chalaga authenticate kyuki user ki sari properties return kaar raha ha

//   const handleChange = (name) => (event) => {
//     setValues({ ...values, error: false, [name]: event.target.value });
//   };

//   const onSubmit = (event) => {
//     event.preventDefault();

//     setValues({ ...values, error: false, loding: true });
//     signin({ email, password }).then((data) => {
//       if (data.error) {
//         setValues({ ...values, error: data.error, loding: false });
//       } else {
//         authenticate(data, () => {
//           setValues({
//             ...values,
//             didredirect: true,
//           });
//         });
//         console.log(user);
//       }
//     });
//     // .catch(console.log("signin problem please check DB conn"));
//   };

//   const performrdirect = () => {
//     if (didredirect) {
//       //ya user aaya ha isAuthenticated() sa
//       if (user && user.role === 1) {
//         // console.log(user.role);
//         return <p>redirect to admin {JSON.stringify(user)}</p>;
//       }
//       if (JSON.stringify(user) === 0) {
//         console.log("no work");
//       } else {
//         return <p>redirect to dashboard</p>;
//       }
//     }
//     if (authenticate()) {
//       return <Redirect to="/" />;
//     }
//   };

//   const lodingMessage = () => {
//     return (
//       //if loding is true then only this is goona be seen else it is not gonna be seen
//       loading && (
//         <div className="alert alert-info">
//           <h1>Loding</h1>
//         </div>
//       )
//     );
//   };

//   const errorMessage = () => {
//     return (
//       <div className="row">
//         <div className="col-md-6 offset-sm-3 text-left">
//           <div
//             className="alert alert-danger"
//             //ya wo error ha jo upper ha values vala
//             style={{ display: error ? "" : "none" }}
//           >
//             {error}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const signInFrom = () => {
//     return (
//       <div className="row">
//         <div className="col-md-6 offset-sm-3 text-left">
//           <form>
//             <div className="form-group">
//               <label className="text-light">Email</label>
//               <input
//                 type="email"
//                 onChange={handleChange("email")}
//                 className="form-control"
//                 value={email}
//               />
//             </div>
//             <div className="form-group">
//               <label className="text-light">Password</label>
//               <input
//                 type="password"
//                 onChange={handleChange("password")}
//                 className="form-control"
//                 value={password}
//               />
//             </div>
//             <button onClick={onSubmit} className="btn btn-success btn-block">
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <Base title="Sign In Page" description="Page for Sign In">
//       {lodingMessage()}
//       {errorMessage()}
//       {signInFrom()}
//       {performrdirect()}
//       <p className="text-white text-center">{JSON.stringify(values)}</p>
//     </Base>
//   );
// };

// export default Signin;

import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";

import { signin, authenticate, isAutheticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "aman@12.com",
    password: "123",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAutheticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              email: "",
              password: "",
              error: "",
              loading: true,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("signin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        //   delayRedirect = event => {
        //     const { history: { push } } = this.props;
        //     event.preventDefault();
        //     setTimeout(()=>push(to), 1000);
        //   }
        // };
        //onClick={this.delayRedirect}
        //return <Redirect to="/admin/dashboard" />;
        //return <p className="text-white"> hello</p>;
        return <Redirect to="/admin/dashboard" />;
      } else {
        //return <p className="text-white"> hello</p>;
        //return <Redirect to="/user/dashboard" />;
        return <Redirect to="/user/dashboard" />;
      }
    }
    // if (isAutheticated()) {
    //   return <Redirect to="/" />;
    // }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control"
                type="email"
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In page" description="A page for user to sign in!">
      {performRedirect()}
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}

      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
