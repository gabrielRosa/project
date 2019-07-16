import React from 'react';
import swal from 'sweetalert';

import { ProjectService } from '../../service/project';

import './main.scss';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: ""
    };
  }

  _handleProjectName(projectName) {
    this.setState({ projectName });
  }

  onDelete() {
    const { project } = this.props;

    swal({
      title: 'Do you want to delete the project?',
      text: 'This process can not be reversed!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        await ProjectService.delete(project);
        document.location.reload(true);
      } else {
        swal('Process canceled!');
      }
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    const { projectName } = this.state

    await ProjectService.create(projectName);
    document.location.reload(true);
  }

  _renderRight() {
    const { numbers } = this.props;

    return (
      <>
        <span className="header__numbers">{numbers}</span>
        <button className="header__delete" onClick={() => this.onDelete()}>Delete project</button>
      </>
    );
  }

  _renderInput() {
    return (
      <form onSubmit={(e) => this.onSubmit(e)}>
        <input type="text" id="name" name="name" onChange={(e) => this._handleProjectName(e.target.value)} minLength="2" placeholder="Type new project name" />
      </form>
    );
  }

  render() {
    const { project } = this.props;

    return (
      <div className="header">
        {project ? <h2>{project.name}</h2> : this._renderInput()}
        <div>
          {project && this._renderRight()}
        </div>
      </div>
    );
  }
}
