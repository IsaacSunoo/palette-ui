import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as actions from '../../actions/index';

import { fetchAllProjects } from '../../thunks/fetchAllProjects';
import { fetchOptions } from '../../utility/fetchOptions';
import { fetchData } from '../../utility/fetchData';

class Modal extends Component {
  constructor() {
    super();
    this.state = {
      paletteName: '',
      projectId: ''
    }
  }

  handleClose = () => {
    const { modalDisplay } = this.props;
    this.props.setModal(modalDisplay)
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    console.log(value);
    this.setState({
      [name]: value
    })
  }

  handleSendPalette = async (event) => {
    event.preventDefault();
    const { currentPalette, modalDisplay } = this.props;
    const { projectId, paletteName } = this.state;
    let sendPalette = {
      name: paletteName,
      color_1: currentPalette[0].color,
      color_2: currentPalette[1].color,
      color_3: currentPalette[2].color,
      color_4: currentPalette[3].color,
      color_5: currentPalette[4].color,
      project_id: projectId
    }
    // console.log(sendPalette);
    const options = await fetchOptions('POST', sendPalette);
    const response = await fetchData('http://localhost:3001/api/v1/palettes', options)
    this.props.fetchAllProjects();
    this.props.setModal(modalDisplay)
  }

  render() {
    const { currentPalette, allProjects } = this.props;

    return (
      <div className="Modal">
        <div className="Modal-Content">
          <section className="Modal-Header">
            <button onClick={this.handleClose}>
              <i className="fas fa-window-close"></i>
            </button>
          </section>
          <section className="Modal-Body">
            <h3>Save Palette To Project</h3>
            <form onSubmit={this.handleSendPalette}>
              <select required name="projectId" value={this.state.projectId} onChange={this.handleChange}>
                <option value="" disabled hidden>Choose Project ...</option>
                {allProjects.map(project =>
                  <option key={project.name} value={project.id} name="projectId">{project.name}</option>
                )}
              </select>
              <input type="text" onChange={this.handleChange}
                                 value={this.state.name}
                                 name="paletteName"
                                 placeholder="Palette To Save"
                     />
              <button>Save Palette</button>
            </form>
            <section className="Modal-Palette">
              {
                currentPalette.length &&
                currentPalette.map(palette => (
                  <div key={palette.color} className="Modal-Color" style={{backgroundColor: palette.color}}>
                    &nbsp;
                  </div>
                ))
              }
            </section>
          </section>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  allProjects: state.allProjects,
  currentPalette: state.currentPalette,
  modalDisplay: state.modalDisplay,
})

export const mapDispatchToProps = (dispatch) => ({
  setModal: (data) => dispatch(actions.setModal(data)),
  fetchAllProjects: (data) => dispatch(fetchAllProjects(data)),
})

Modal.propTypes = {
  currentPalette: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
