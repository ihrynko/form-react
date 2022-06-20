import { Component } from "react";
import "./Form.scss";
import Input from "../Input";

class Form extends Component {
  constructor() {
    super();

    this.state = {
      fields: {
        name: {
          title: "Name",
          type: "name",
          name: "name",
          value: "",
          error: false,
          placeholder: "Input your name..",
          validator: (value = "") => {
            return value.length >= 2
              ? false
              : !value.length
              ? "Required"
              : "Name is too short";
          },
        },
        email: {
          title: "Email",
          type: "email",
          name: "email",
          value: "",
          error: false,
          placeholder: "Input your email..",
          validator: (value = "") => {
            return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
              ? false
              : "Email is invalid";
          },
        },
        password: {
          title: "Password",
          type: "password",
          name: "password",
          autoComplete: "false",
          value: "",
          error: false,
          placeholder: "Input your password..",
          validator: (value = "") => {
            return value.match(
              /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g
            )
              ? false
              : !value.length
              ? "Required"
              : "Password is too simple";
          },
        },
        passwordConfirm: {
          title: "Password confirm",
          type: "password",
          name: "passwordConfirm",
          autoComplete: "false",
          value: "",
          error: false,
          placeholder: "Confirm your password..",
          validator: (value = "", allValues) => {
            return value === allValues.password
              ? false
              : !value.length
              ? "Required"
              : "Passwords dont match";
          },
        },
      },
      isError: null,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { isError } = this.state;
    let updatedFields = {};
    let updatedIsError = isError;

    Object.entries(this.state.fields).map(([fieldName, fieldState]) => {
      const error = fieldState.validator(fieldState.value, {
        password: this.state.fields.password.value,
        passwordConfirm: this.state.fields.passwordConfirm.value,
      });

      updatedFields[fieldName] = { ...fieldState, error };
      updatedIsError = error;
    });

    this.setState(
      {
        fields: updatedFields,
        isError: updatedIsError,
      },
      () => {
        if (!isError) {
          Object.entries(this.state.fields).forEach(
            ([fieldName, fieldState]) => {
              console.log(`${fieldName}: ${fieldState.value}`);
            }
          );
        }
      }
    );
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    const { password, passwordConfirm } = this.state.fields;

    const currentField = { ...this.state.fields[name] };

    if (name === "password") {
      const passwordError = currentField.validator(value, {
        passwordConfirm: passwordConfirm.value,
      });

      const passwordConfirmError = passwordConfirm.validator(
        passwordConfirm.value,
        { password: value }
      );

      this.setState({
        fields: {
          ...this.state.fields,
          password: { ...currentField, error: passwordError, value },
          passwordConfirm: {
            ...passwordConfirm,
            error: passwordConfirmError,
          },
        },
      });
      return;
    }
    if (name === "passwordConfirm") {
      const passwordError = password.validator(password.value, {
        passwordConfirm: value,
      });

      const passwordConfirmError = currentField.validator(value, {
        password: password.value,
      });

      this.setState({
        fields: {
          ...this.state.fields,
          password: { ...password, error: passwordError },
          passwordConfirm: {
            ...currentField,
            error: passwordConfirmError,
            value,
          },
        },
      });
      return;
    }

    const error = currentField.validator(value, {
      password,
      passwordConfirm,
    });

    this.setState({
      fields: {
        ...this.state.fields,
        [name]: { ...currentField, error, value },
      },
    });
  };

  handleReset = (event) => {
    event.preventDefault();
    let updatedFields = {};
    Object.entries(this.state.fields).map(([fieldName, fieldState]) => {
      const updatedField = {
        ...fieldState,
        value: "",
        error: false,
      };
      updatedFields[fieldName] = updatedField;
      this.setState({ fields: updatedFields, isError: null });
    });
  };

  handleSubmitButton = () => {
    let errors = [];
    let values = [];
    Object.entries(this.state.fields).forEach(([_fieldName, fieldState]) => {
      let error = fieldState.error;
      let value = fieldState.value;
      errors.push(error);
      values.push(value);
    });
    if (
      errors.every((error) => error === false) &&
      values.every((value) => value !== "")
    ) {
      return false;
    }
    return true;
  };

  render() {
    const { fields } = this.state;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        {Object.entries(fields).map(([_, fieldState], index) => {
          const { title, name, type, autoComplete, placeholder, error, value } =
            fieldState;
          return (
            <Input
              key={index}
              title={title}
              autoComplete={autoComplete}
              type={type}
              error={error}
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={this.handleChange}
            />
          );
        })}
        <div className="button-container"></div>
        <button onClick={this.handleReset} className="button">
          Reset
        </button>
        <button
          className="button submit"
          disabled={this.handleSubmitButton()}
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}

export default Form;
