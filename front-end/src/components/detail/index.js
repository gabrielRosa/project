import React from 'react';
import Header from '../header';

import './main.scss';
import Task from '../task';
import Plus from '../plus';
import FormGroup from '../formGroup';
import { TaskService } from '../../service/task';

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      showForm: false,
      dueDate: null,
      owner: null,
      description: null
    };
  }

  _handleDueDate(dueDate) {
    this.setState({ dueDate });
  }

  _handleOwner(owner) {
    this.setState({ owner });
  }

  _handleDescription(description) {
    this.setState({ description });
  }

  _handleShowForm(showForm) {
    this.setState({ showForm });
  }

  _isLate(dtDue) {
    return (new Date(dtDue).getTime() < new Date().getTime());
  }

  _numbers() {
    const { tasks } = this.props;

    if (Array.isArray(tasks)) {
      const done = tasks.filter(t => !!t.Checked).length;
      const late = tasks.filter(t => this._isLate(t.DtDue) && !t.Checked).length;
      
      return `${done}/${late}/${tasks.length - done}`;
    }

    return '';
  }

  async _onSubmit(e) {
    e.preventDefault();
    const { description, owner, dueDate } = this.state;
    const { project: { id } } = this.props;

    await TaskService.create(description, owner, dueDate, id);
    document.location.reload(true);
  }

  _renderForm() {
    return (
      <form onSubmit={(e) => this._onSubmit(e)}>
        <FormGroup>
          <label htmlFor="description">Description </label>
          <input id="description" name="description" type="text" placeholder="Description" minLength="3" required onChange={(e) => this._handleDescription(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="owner">Owner </label>
          <input id="owner" name="owner" type="text" placeholder="Owner" minLength="3" required onChange={(e) => this._handleOwner(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="date">Due date </label>
          <input id="date" name="date" type="date" placeholder="Due date" required onChange={(e) => this._handleDueDate(e.target.value)}  />
        </FormGroup>
        <FormGroup>
          <button type="submit">Create</button>
        </FormGroup>
      </form>
    );
  }

  _renderTasks() {
    const { tasks } = this.props;
    
    if (!Array.isArray(tasks)) return null;

    return tasks.map(({ Description, Owner, DtDue, Checked, TaskId }, i) => {
      const late = this._isLate(DtDue);

      return (
        <li key={i}>
          <Task 
            text={Description} 
            user={Owner} 
            id={TaskId} 
            checked={Checked} 
            dueDate={new Date(DtDue)} 
            disabled={!!Checked} 
            error={late && !Checked} 
          />
        </li>
      );
    }) 
  }

  _renderAddTask() {
    const { project } = this.props;

    if (!project) return null;

    return <button className="detail__add-task" onClick={() => this._handleShowForm(true)}><Plus /> Add Task</button>;
  }

  render() {
    const { showForm } = this.state;
    const { tasks, project } = this.props;

    return (
      <div className="detail">
        <Header project={project} numbers={this._numbers()} />
        <ul className="detail__tasks">
          {this._renderTasks()}
        </ul>
        {showForm? this._renderForm() : this._renderAddTask()}
      </div>
    );
  }
}
