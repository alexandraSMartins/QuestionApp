import React from "react";
import "./QuestionForm.css";
//Import Components
import Alert from "@material-ui/lab/Alert";
import { Form, Field } from "react-final-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  composeValidators,
  required,
  emailFormat,
  greaterThanTomorrow,
} from "./Validators";
import { BrowserRouter as Router, Redirect } from "react-router-dom";

//Adapted from: https://final-form.org/docs/react-final-form/examples/simple

const DatePickerAdapter = ({ input: { onChange, value }, ...rest }) => (
  <DatePicker selected={value} onChange={(date) => onChange(date)} {...rest} />
);

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorAlert: false, //turns true whenever an error occurs from external requests. When true, an alert will appear with an error message
      errorMessage: "", //saves the error message if an error occurs
      redirect: false, //if true, redirects to the desired path
    };
  }

  componentWillUnmount() {
    this.setState({ errorAlert: false, errorMessage: "" });
  }

  // API Requests

  postQuestion = (formData) => {
    const date =
      formData.date &&
      `${formData.date.getFullYear()}/${
        formData.date.getMonth() + 1
      }/${formData.date.getDate()}`;

    const data = {
      name: formData.name,
      email: formData.email,
      date: date,
      observations: formData.observations,
    };

    const url = process.env.REACT_APP_SERVER_URL + "/questions";

    const requestConfig = {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(url, requestConfig)
      .then(this.handleErrors)
      .then(() => {
        this.handleReturn();
      })
      .catch((error) => {
        this.setState({
          errorAlert: true,
          errorMessage: error.message,
        });
      });
  };

  handleErrors(response) {
    if (!response.ok) {
      throw Error(
        "An Internal Error has occurred. Please retry the operation."
      );
    }
    return response;
  }

  //API Requests END

  handleReturn = () => {
    this.setState({ redirect: true });
    window.location.reload();
  };

  render() {
    return (
      <div className="form-container">
        <Router>{this.state.redirect && <Redirect to="/" />}</Router>
        <h2>Submit Question</h2>
        <Form
          onSubmit={this.postQuestion}
          render={({ handleSubmit, form, submitting, pristine }) => (
            <form onSubmit={handleSubmit} className="form">
              <div className="form-item">
                <label>Name</label>
                <Field name="name" validate={required}>
                  {({ input, meta }) => {
                    return (
                      <div>
                        <input
                          {...input}
                          type="text"
                          placeholder="Name"
                          style={{ width: "100%" }}
                        />
                        {meta.error && meta.touched && (
                          <div className="error">{meta.error}</div>
                        )}
                      </div>
                    );
                  }}
                </Field>
              </div>
              <div className="form-item">
                <label>Email</label>
                <Field
                  name="email"
                  validate={composeValidators(required, emailFormat)}
                >
                  {({ input, meta }) => {
                    return (
                      <div>
                        <input
                          {...input}
                          type="text"
                          placeholder="Email"
                          style={{ width: "100%" }}
                        />
                        {meta.error && meta.touched && (
                          <div className="error">{meta.error}</div>
                        )}
                      </div>
                    );
                  }}
                </Field>
              </div>
              <div className="form-item">
                <label>Date</label>
                <Field
                  name="date"
                  dateFormat="yyyy/MM/dd"
                  validate={composeValidators(required, greaterThanTomorrow)}
                  component={DatePickerAdapter}
                >
                  {({ input, meta }) => {
                    return (
                      <div>
                        <DatePicker
                          dateFormat="yyyy/MM/dd"
                          selected={input.value}
                          customInput={
                            <input type="text" style={{ width: "100%" }} />
                          }
                          onChange={(date) => input.onChange(date)}
                        />
                        {meta.error && meta.dirty && (
                          <div className="error">{meta.error}</div>
                        )}
                      </div>
                    );
                  }}
                </Field>
              </div>
              <div className="form-item">
                <label>Observations</label>
                <Field
                  name="observations"
                  component="textarea"
                  type="text"
                  placeholder="Observations"
                  style={{ width: "100%" }}
                />
              </div>

              <div className="buttons">
                <button type="submit" disabled={form.getState().invalid}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
            </form>
          )}
        />
        {this.state.errorAlert && (
          <Alert severity="error">{this.state.errorMessage}</Alert>
        )}
        <button
          className="submit-button"
          type="button"
          onClick={this.handleReturn}
        >
          Return
        </button>
      </div>
    );
  }
}

export default QuestionForm;
