import React from "react";

function FormCheckbox({ name }) {
  return (
    <div className="form-control">
      <label className="label cursor-pointer gap-4">
        <span className="label-text">Completed</span>
        <input
          name={name}
          type="checkbox"
          className="checkbox checkbox-primary"
        />
      </label>
    </div>
  );
}

export default FormCheckbox;
