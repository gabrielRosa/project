import React from 'react';
import Sidebar from './components/sidebar';

import './main.scss';
import Detail from './components/detail';
import { TaskService } from './service/task';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      currentProject: null
    };
  }

  _handleTasks(tasks) {
    this.setState({ tasks });
  }

  _handleCurrentProject(currentProject) {
    this.setState({ currentProject });
  }

  async _onSelectProject(project) {
    let result = null;

    if (project) {
      const { id } = project;
    
      result = await TaskService.getTasksByProject(id);
    }
    
    this._handleTasks(result);
    this._handleCurrentProject(project);
  }

  render() {
    const { tasks, currentProject } = this.state;

    return (
      <div className="app">
        <Sidebar onSelectProject={(project) => this._onSelectProject(project)} />
        <Detail tasks={tasks} project={currentProject} />
      </div>
    );
  }
}
