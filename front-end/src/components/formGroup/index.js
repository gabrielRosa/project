import React from 'react';

import './main.scss';

export default function FormGroup(props) {
  const { children } = props;

  return (
    <div className="form-group">
      {children}
    </div>
  );
}
