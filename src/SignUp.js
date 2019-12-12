import React, { Component } from "react";
import GoogleSignIn from "./GoogleSignIn";
import ErrorMsg from "./ErrorMsg";
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
      confirmPassword: "",
      passwordMatch: ""
    },
    formValid: false,
    authError: "",
    createError: "",
    loading: false
  };

  // Set state with input values and if there are any errors. Error checking will be done in the validateForm function which the ui and other functionalities depend on.
  // We use passwordMatch to check if the password and confirmation is the same.
  // This is useful if the user first fills in password and confirmation and then changes password. Without this we had a bug that did not update confirmed and formvalidation.
  onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let errorMessage = "";
    let passwordMatch = "";

    switch (name) {
      case "displayName":
        errorMessage = value.length < 3 ? "Name must be at least 3 characters" : "";
        break;
      case "email":
        errorMessage = validateMail.test(value) ? "" : "Please enter a valid e-mail address";
        break;
      case "password":
        errorMessage = value.length < 8 ? "Password must be at least 8 characters" : "";
        passwordMatch =
          value === this.state.inputs.confirmPassword ? "" : "Password does not match";
        break;
      case "confirmPassword":
        errorMessage = value !== this.state.inputs.password ? "Password does not match" : "";
        passwordMatch = value === this.state.inputs.password ? "" : "Password does not match";
        break;
      default:
        break;
    }

    this.setState(
      {
        inputs: { ...this.state.inputs, [name]: value },
        errors: { ...this.state.errors, passwordMatch, [name]: errorMessage },
        createError: ""
      },
      this.validateForm
    );
  };

  // Form validation is done here. Set state weither form is valid or not. We validate all fields before setting formValid - in case one field is left empty etc.
  // We don't validate form if passwordMatch is not empty.
  validateForm = () => {
    const { passwordMatch } = this.state.errors;
    let inputsValid = true;
    let noErrors = true;

    // Check if all inputs have a length higher than 1. If not, set inputsValid to false.
    Object.values(this.state.inputs).forEach(val => val.length < 1 && (inputsValid = false));

    // Check if all erorrs are empty. If not, set noErrors to false.
    Object.values(this.state.errors).forEach(val => val.length > 0 && (noErrors = false));

    // If inputsValid true AND noErrors AND passwordMatch is empty, set formValid to true and validate the form.
    if (inputsValid && noErrors && !passwordMatch) {
      this.setState({ formValid: true });
    } else {
      this.setState({ formValid: false });
    }
  };

  onSubmit = event => {
    event.preventDefault();

    // Set state first so we can use the loading state and display it in the UI.
    this.setState({ loading: true }, async () => {
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
        this.setState({ loading: false, createError: error.message });
      }
    });
  };

  render() {
    const {
      inputs: { email, password, displayName, confirmPassword },
      errors,
      formValid,
      createError,
      loading
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

        {!formValid && <ErrorMsg message={errors.displayName} />}

        <input
          type="email"
          name="email"
          className={`form-control ${errors.email ? "mb-0" : "mb-4"}`}
          placeholder="E-mail"
          onChange={this.onChange}
          value={email}
          required={true}
        />

        {!formValid && <ErrorMsg message={errors.email} />}

        <input
          type="password"
          name="password"
          className={`form-control ${errors.password ? "mb-0" : "mb-4"}`}
          placeholder="Password"
          required={true}
          onChange={this.onChange}
          value={password}
        />

        {!formValid && <ErrorMsg message={errors.password} />}

        <input
          onChange={this.onChange}
          value={confirmPassword}
          required={true}
          className={`form-control ${errors.passwordMatch ? "mb-0" : "mb-4"}`}
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
        />

        {!formValid && errors.passwordMatch && confirmPassword && (
          <ErrorMsg message={errors.passwordMatch} />
        )}

        {createError && <SubmitError message={createError} />}

        <button
          className="btn btn-info my-4 btn-block"
          disabled={!formValid || loading}
          type="submit"
        >
          {loading && (
            <span
              className="spinner-border spinner-border-sm mr-2"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          {loading ? "Signing up" : "Sign up"}
        </button>
        <GoogleSignIn />
      </form>
    );
  }
}

export default withRouter(SignUp);
