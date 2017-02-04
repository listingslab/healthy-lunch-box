/**
 * Created by Chris Dorward on 16/01/2017
 * templates/HealthyLunchbox/HealthyLunchbox
 */

import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import './HealthyLunchbox.scss';

class HealthyLunchbox extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      endPoint: 'app'
    };
  }

  componentDidMount() {
    this.hideHeader();
  }

  componentWillUnmount() {
    this.showHeader();
  }

  hideHeader() {
    $('#hlb-header').hide();
    $('#hlbBreadcrumb').hide();
  }

  showHeader() {
    $('#hlb-header').show();
    $('#hlbBreadcrumb').show();
  }

  render() {
    return (
      <div className="hlb container">
        #hlbNav
        Use jquery to hide the top of the page
      </div>
    );
  }
}

export default HealthyLunchbox;
