// components/FormInput.js
import React from "react";

function FormInput({ labelText, type, name }) {
  return (
    <div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">{labelText}</span>
        </div>
        <input
          type={type}
          name={name}
          placeholder="Type here"
          className="input input-bordered w-full"
        />
      </label>
    </div>
  );
}

export default FormInput;
