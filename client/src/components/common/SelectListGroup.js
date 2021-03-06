import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({ name, value, error, info, options, onChange }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.value}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && (
        <small className="form-text text-muted">
          {" "}
          <i
            className="fas fa-lightbulb text-primary"
            style={{ color: "#f1c40f" }}
          />{" "}
          {info}
        </small>
      )}
      {error && (
        <div className="invalid-feedback">
          <i className="fas fa-exclamation-triangle" /> {error}
        </div>
      )}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SelectListGroup;
