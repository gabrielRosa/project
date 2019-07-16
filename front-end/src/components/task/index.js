import React from 'react';

import './main.scss';
import Checkbox from '../checkbox';
import FormGroup from '../formGroup';
import { TaskService } from '../../service/task';

export default function Task(props) {
  const { text, user, checked, error, disabled, id, dueDate } = props;

  const onChange = async () => {
    await TaskService.check(id);
    document.location.reload(true);
  }

  return (
    <div className="task">
      <FormGroup>
        <Checkbox label={text + ` @${user} ${dueDate.getMonth()}/${dueDate.getDate()}`} id={id} onChange={onChange} disabled={disabled} error={error} check={checked} />
      </FormGroup>
    </div>
  );
}
