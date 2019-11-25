import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import InputError from "./InputError";
import SubmitError from "./SubmitError";
import GoogleSignIn from "./GoogleSignIn";
import { validateMail } from "./Utils/utilities";
import { auth } from "./Utils/firebase";

export class SignIn extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: {
      email: ""
    },
    authError: "",
    loading: false
  };

  onChange = e => {
    let errorMessage = "";
    const { name, value } = e.target;

    if (name === "email") {
      errorMessage = validateMail.test(value) ? "" : "Please enter valid e-mail address";
    }

    this.setState({
      [name]: value,
      errorMessage: { ...this.state.errorMessage, [name]: errorMessage },
      authError: ""
    });
  };

  onSubmit = event => {
    event.preventDefault();

    this.setState({ loading: true }, async () => {
      const { email, password } = this.state;

      try {
        await auth.signInWithEmailAndPassword(email, password);
        this.props.history.push("/");
      } catch (error) {
        this.setState({
          loading: false,
          authError: "Incorrect e-mail or password. Please try again"
        });
      }
    });
  };

  render() {
    const { email, password, errorMessage, authError, loading } = this.state;
    const isEnabled = email.length > 0 && password.length > 0 && errorMessage.email < 1;

    return (
      <form className="signform text-center border border-light p-5" onSubmit={this.onSubmit}>
        <p className="h4 mb-4">Sign in</p>
        <input
          type="email"
          name="email"
          className={`form-control ${errorMessage.email ? "mb-0" : "mb-4"}`}
          placeholder="E-mail"
          onChange={this.onChange}
          value={email}
          required={true}
        />
        {errorMessage.email && <InputError message={errorMessage.email} />}
        <input
          type="password"
          name="password"
          className="form-control mb-4"
          placeholder="Password"
          onChange={this.onChange}
          required={true}
          value={password}
        />
        {authError && <SubmitError message={authError} />}
        <button
          className="btn btn-info btn-block my-4"
          disabled={!isEnabled || loading}
          type="submit"
        >
          {loading && (
            <span
              className="spinner-border spinner-border-sm mr-2"
              role="status"
              aria-hidden="true"
            ></span>
          )}{" "}
          {loading ? "Signing in" : "Sign in"}
        </button>
        <p>
          Not a member?
          <Link to="/signup"> Register</Link>
        </p>
        <GoogleSignIn />
      </form>
    );
  }
}

export default withRouter(SignIn);
