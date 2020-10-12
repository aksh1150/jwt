import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

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

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  //   const onChangeUsername = (e) => {
  //     const username = e.target.value;
  //     setUsername(username);
  //   };

  //   const onChangePassword = (e) => {
  //     const password = e.target.value;
  //     setPassword(password);
  //   };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          props.history.push("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12 mt-4">
      <div className="card card-body p-4 text-center mx-auto d-block">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="rounded-circle mx-auto d-block"
          style={{ width: "200px" }}
        />

        <Form onSubmit={handleLogin} ref={form} className="mt-4 text-left">
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
              validations={[required]}
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
              validations={[required]}
            />
          </div>

          <div className="form-group text-center mt-4">
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              style={{ width: "150px" }}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              Login
            </Button>
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
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
export default Login;
