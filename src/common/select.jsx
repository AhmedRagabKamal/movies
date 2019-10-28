import React from 'react';

const Select = ({ name, error, label, options, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select {...rest} id={name} name={name} className="form-control">
        <option value="" />
        {options && options.length ? (
          options.map(({ _id, name }) => (
            <option key={_id} value={_id}>
              {name}
            </option>
          ))
        ) : (
          <option value="">No data found</option>
        )}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
