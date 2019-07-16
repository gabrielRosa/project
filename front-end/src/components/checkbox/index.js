import React, { useState } from 'react';

import './main.scss';

export default function Checkbox(props) {
  const { check = false, disabled = false, error = false , id, label, onChange } = props;

  const [checked, setChecked] = useState(check);
  const handleChange = (e) => {
    setChecked(e.target.checked);
    onChange(e.target.checked);
  }

  return (
    <>
      <input
        type="checkbox"
        className={`ckb ${error && 'error'}`}
        id={id}
        disabled={disabled}
        checked={checked}
        onChange={e => handleChange(e)}
      />
      <label htmlFor={id} className="ckb-lbl">{label}</label>
    </>
  );
}
