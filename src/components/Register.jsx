import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import Button from "@material-ui/core/Button";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-warning" role="alert">
        Warning — This field is required!
      </div>
    );
  }
};
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters long.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters long.
      </div>
    );
  }
};
const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  //   const onChangeUsername = (e) => {
  //     const username = e.target.value;
  //     setUsername(username);
  //   };

  //   const onChangePassword = (e) => {
  //     const password = e.target.value;
  //     setPassword(password);
  //   };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12 mt-4">
      <h2 className="p-4">New user register here:</h2>
      <div
        className="card card-body p-4 text-center mx-auto d-block"
        style={{ width: "400px" }}
      >
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="rounded-circle mx-auto d-block"
          style={{ width: "200px" }}
        />

        <Form onSubmit={handleRegister} ref={form} className="mt-4 text-left">
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username" className="card-text">
                  Username
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="card-text">
                  Email
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group text-center mt-4">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ width: "150px" }}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};
export default Register;
