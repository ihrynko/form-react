import { Component } from "react";
import "./Form.scss";
import Input from "./Input";
import initialState from "../state";

class Form extends Component {
  state = {
    ...initialState,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { fields, isError } = this.state;
    const { password, passwordConfirm } = this.state.fields;
    let updatedFields = {};
    let updatedIsError = isError;

    Object.entries(fields).map(([fieldName, fieldState]) => {
      const error = fieldState.validator(fieldState.value, {
        passwordConfirm: (passwordConfirm.value, password.value),
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
          Object.entries(fields).forEach(([fieldName, fieldState]) => {
            console.log(`${fieldName}: ${fieldState.value}`);
          });
          this.handleReset();
        }
      }
    );
  };

  handleOnChange = (event) => {
    const { value, name } = event.target;
    const { password, passwordConfirm } = this.state.fields;
    const currentField = this.state.fields[name];

    const error = currentField.validator(value, password.value);
    if (name === "password") {
      const passwordConfirmError = passwordConfirm.validator(
        passwordConfirm.value,
        value
      );
      this.setState({
        fields: {
          ...this.state.fields,
          [name]: { ...currentField, value, error },
          passwordConfirm: {
            ...this.state.fields.passwordConfirm,
            error: passwordConfirmError,
          },
        },
      });
    } else
      this.setState({
        fields: {
          ...this.state.fields,
          [name]: { ...currentField, value, error },
        },
      });
  };

  handleReset = () => {
    this.setState({ ...initialState });
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

    const isNotError = errors.every((error) => error === false);
    const isNotEmptyField = values.every((value) => value !== "");

    if (isNotError && isNotEmptyField) {
      return false;
    }

    return true;
  };

  render() {
    const { fields } = this.state;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        {Object.entries(fields).map(([fieldName, fieldState]) => {
          const { title, name, type, autoComplete, placeholder, error, value } =
            fieldState;
          return (
            <Input
              key={fieldName}
              title={title}
              autoComplete={autoComplete}
              type={type}
              error={error}
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={this.handleOnChange}
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
