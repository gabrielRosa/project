import React from 'react';

import Arrow from '../arrow';
import Plus from '../plus';
import { ProjectService } from '../../service/project';

import './main.scss';

export default class Sidebar extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  _handleProjects(projects) {
    this.setState({ projects });
  }

  async componentDidMount() {
    const projects = await ProjectService.getAll();

    this._handleProjects(projects);
  }

  onSelectProject(id, name) {
    const { onSelectProject } = this.props;

    if (id) {
      onSelectProject({ id, name });
      return;
    }

    onSelectProject(null);
  }

  render() {
    const { projects } = this.state;

    return (
      <div className="sidebar">
        <h1 className="sidebar__title">Projects</h1>
        <ul className="sidebar__projects">
          {
            projects && projects.map(({ Name, ProjectId }, i) => (
                <li key={i}>
                  <button onClick={() => this.onSelectProject(ProjectId, Name)}>
                    <span>{Name}</span><Arrow />
                  </button>
                </li>
              )
            )
          }
        </ul>
        <button className="sidebar__new-project" onClick={() => this.onSelectProject(null)}><Plus/>New Project</button>
      </div>
    );
  }
}
