/**
 * Created by Chris Dorward on 16/01/2017
 * container/NotFound
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class NotFound extends Component {
  static propTypes = {
    selectedReddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    return (
      <div>
        <h3>Not Found</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { selectedReddit, postsByReddit } = state;
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  };

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated
  };
};

export default connect(mapStateToProps)(NotFound);
