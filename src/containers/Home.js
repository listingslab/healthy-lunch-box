/**
 * Created by Chris Dorward on 16/01/2017
 * container/Home
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  static propTypes = {
  }

  render() {
    return (
      <div>Home</div>
    );
  }
}

const mapStateToProps = () => {};

export default connect(mapStateToProps)(Home);
