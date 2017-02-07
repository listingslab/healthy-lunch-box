/* global editor */
/* global cms */
/**
 * Created by Chris Dorward on 18/01/2017
 * templates/About/About
 */

import React, { Component, PropTypes } from 'react';
import EditLink from '../../components/EditLink/EditLink';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

class About extends Component {
  static propTypes = {
    input: PropTypes.string
  }

  makeMarkup(html) {
    return { __html: html };
  }

  render() {
    let editBtn = null;
    if (editor) {
      editBtn = (
        <EditLink
          editUrl={cms.app.data.about.editUrl}
        />
      );
    }
    return (
      <div className="row margin-top-25">
        <Breadcrumb />
          <div className="container">
            <div className="row" >
              <div className="raised-page" >
                <div dangerouslySetInnerHTML={this.makeMarkup(cms.app.data.about.post.post_content)} />
              </div>
            </div>
          </div>
        {editBtn}
      </div>
    );
  }
}

export default About;
