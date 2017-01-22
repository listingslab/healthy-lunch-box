import React from 'react';
import { Motion, spring } from 'react-motion';
import { Navbar } from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';
import NavigationData from '../../testData/NavigationData';
import Lunchbox from '../Lunchbox/Lunchbox';

import './Navigation.scss';

const Navigation = React.createClass({
  getInitialState() {
    return {open: false};
  },

  onNavItemClick(itemData) {
    console.log('\n________________________\nonNavItemClick');
    // console.log(itemData);
    if (itemData.to !== '' || itemData.route !== '') {
      // console.log(`If there is a 'route' or 'to' attribute, send user to ->\n${itemData.to}`);
      browserHistory.push(itemData.to);
    }
  },

  onLunchBoxClick(itemData) {
    console.log('\n________________________\nonLunchBoxClick');
    console.log(itemData);
  },

  handleMouseDown() {
    this.setState({ open: !this.state.open });
  },

  handleTouchStart(e) {
    e.preventDefault();
    this.handleMouseDown();
  },

  render() {
    const items = [];
    // button types: default, primary, success, info, warning, danger, link
    const navData = {
      meta: '',
      dataArr: NavigationData
    };
    for (let i = 0; i < navData.dataArr.length; i += 1) {
      const itemData = navData.dataArr[i];
      const navKey = `navitem_${i}`;
      const className = `btn btn-${itemData.btnType} navitem-btn navitem-btn-${itemData.btnType}`;
      const boundClick = this.onNavItemClick.bind(this, itemData);
      items.push(
        <Link
          key={navKey}
          data={itemData}
          className={className}
          onClick={boundClick}
        >
        {itemData.text}
      </Link>
      );
    }


    return (
      <div className="navigation">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">
                <img className="cc_logo" alt="Cancer Council NSW Logo" src="/img/daffs/yellow.png" height="45" />
              </Link>
            </Navbar.Brand>
             <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <button
              className="btn btn-default navitem-btn"
              onMouseDown={this.handleMouseDown}
              onTouchStart={this.handleTouchStart}>
              Lunchbox
            </button>
            {items}
          </Navbar.Collapse>
        </Navbar>
        <Motion className="lunchbox" style={{ x: spring(this.state.open ? 0 : -1200) }}>
          {({ x }) =>
              <div className="lunchbox-overlay" style={{
                zIndex: 10000,
                WebkitTransform: `translate3d(${x}px, 0, 0)`,
                transform: `translate3d(${x}px, 0, 0)`
              }} >
                <Lunchbox passThis="this is passed" />
              </div>
          }
        </Motion>
      </div>
    );
  }
});

export default Navigation;

/*
function onClickHandler(e) {
  console.log('navigationClickHandler\n________________________');
  browserHistory.push('/some/path');
  console.log(e);
}
*/
