import React from "react";
import classes from "./Input.css";

const input = (props) => {
  let inputEl = null;
  const inputClasses = [classes.InputEl];
  let validationErrMsg = null;

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
    validationErrMsg = <p className={classes.ValidationErrMsg}>{props.errMsg}</p>;
  }

  switch (props.elementType) {
    case "input":
      inputEl = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputEl = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    case "textarea":
      inputEl = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    default:
      inputEl = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputEl}
      {validationErrMsg}
    </div>
  );
};

export default input;
