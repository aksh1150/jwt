import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
}));
const required = (value) => {
  if (!value) {
    return (
      <Alert severity="warning">
        Warning — <strong>This field is required!</strong>
      </Alert>
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
  const classes = useStyles();
  return (
    <div style={{ padding: 20 }}>
      <Paper className={classes.paper}>
        <Grid
          container
          spacing={2}
          direction="column"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item>
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="profile-img-card"
            />
          </Grid>
          <Grid item xs={12} sm container>
            <Form onSubmit={handleLogin} ref={form}>
              <Grid
                item
                xs
                container
                direction="column"
                justify="space-evenly"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="my-input">Email address</InputLabel>
                    <Input
                      type="text"
                      id="email"
                      aria-describedby="emailid"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      validations={[required]}
                    />
                    <FormHelperText id="emailid">
                      Email required!
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="my-input">Password</InputLabel>
                    <Input
                      type="password"
                      id="password"
                      aria-describedby="pass"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      validations={[required]}
                    />
                    <FormHelperText id="pass">
                      Password required!
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={loading}
                  >
                    {loading && <CircularProgress />}
                    Login
                  </Button>
                </Grid>

                {message && <Alert severity="error">{message}</Alert>}
              </Grid>
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
export default Login;
