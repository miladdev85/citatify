import React, { Component } from "react";
import GoogleSignIn from "./GoogleSignIn";
import InputError from "./InputError";
import SubmitError from "./SubmitError";
import { withRouter } from "react-router-dom";
import { validateMail } from "./Utils/utilities";
import { auth, createUserProfileDocument } from "./Utils/firebase";

export class SignUp extends Component {
  state = {
    inputs: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    errors: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    formValid: false,
    authError: "",
    createError: ""
  };

  onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let errorMessage = "";

    switch (name) {
      case "displayName":
        errorMessage = value.length < 3 ? "Name must be at least 3 characters" : "";
        break;
      case "email":
        errorMessage = validateMail.test(value) ? "" : "Please enter a valid e-mail address";
        break;
      case "password":
        errorMessage = value.length < 8 ? "Password must be at least 8 characters" : "";
        break;
      case "confirmPassword":
        errorMessage = value !== this.state.inputs.password ? "Password does not match" : "";
        break;
      default:
        break;
    }

    this.setState(
      {
        inputs: { ...this.state.inputs, [name]: value },
        errors: { ...this.state.errors, [name]: errorMessage },
        createError: ""
      },
      () => this.validateForm()
    );
  };

  validateForm = () => {
    let inputsValid = true;
    let noErrors = true;

    Object.values(this.state.inputs).forEach(val => val.length < 1 && (inputsValid = false));
    Object.values(this.state.errors).forEach(val => val.length > 0 && (noErrors = false));

    if (inputsValid && noErrors) {
      this.setState({ formValid: true });
    } else {
      this.setState({ formValid: false });
    }
  };

  onSubmit = async event => {
    event.preventDefault();
    const { email, password, displayName } = this.state.inputs;

    try {
      //createUserWithEmailAndPassword will sign in automatically and fire off listener in AuthContext
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      // Run helper function to add displayName property to user profile
      await createUserProfileDocument(user, {
        displayName
      });

      this.props.history.push("/");
    } catch (error) {
      this.setState({ createError: error.message });
    }
  };

  render() {
    const {
      inputs: { email, password, displayName, confirmPassword },
      errors,
      formValid,
      createError
    } = this.state;

    return (
      <form className="signform text-center border border-light p-5" onSubmit={this.onSubmit}>
        <p className="h4 mb-4">Sign up</p>
        <input
          type="text"
          name="displayName"
          className={`form-control ${errors.displayName ? "mb-0" : "mb-4"}`}
          placeholder="Name"
          onChange={this.onChange}
          value={displayName}
          required={true}
        />

        {!formValid && <InputError message={errors.displayName} />}

        <input
          type="email"
          name="email"
          className={`form-control ${errors.email ? "mb-0" : "mb-4"}`}
          placeholder="E-mail"
          onChange={this.onChange}
          value={email}
          required={true}
        />

        {!formValid && <InputError message={errors.email} />}

        <input
          type="password"
          name="password"
          className={`form-control ${errors.password ? "mb-0" : "mb-4"}`}
          placeholder="Password"
          required={true}
          onChange={this.onChange}
          value={password}
        />

        {!formValid && <InputError message={errors.password} />}

        <input
          onChange={this.onChange}
          value={confirmPassword}
          required={true}
          className={`form-control ${errors.confirmPassword ? "mb-0" : "mb-4"}`}
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
        />

        {!formValid && <InputError message={errors.confirmPassword} />}

        {createError && <SubmitError message={createError} />}

        <button className="btn btn-info my-4 btn-block" disabled={!formValid} type="submit">
          Sign up
        </button>
        <GoogleSignIn />
      </form>
    );
  }
}

export default withRouter(SignUp);
