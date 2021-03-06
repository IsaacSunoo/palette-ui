import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Projects from '../Projects/Projects'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';

class ProjectDisplay extends Component {
  state = {
    bottom: false,
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  }

  render() {
    return (
      <div className='ProjectDisplay'>
        <Button onClick={this.toggleDrawer('bottom', true)} className='ProjectBtn'>
          Explore <i className='fas fa-angle-up UpBtn'></i>
        </Button>
        <SwipeableDrawer
          anchor='bottom'
          open={this.state.bottom}
          onClose={this.toggleDrawer('bottom', false)}
          onOpen={this.toggleDrawer('bottom', true)}
        >
          <div className='ProjectDisplay-Content'>
            <Projects />
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

ProjectDisplay.propTypes = {
  classes: PropTypes.object,
};

export default ProjectDisplay;
