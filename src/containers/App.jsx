/* global cms */
/**
 * Created by Chris Dorward on 20/01/2017
 * containers/App
 */

import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import cookie from 'react-cookie';
import $ from 'jquery';
import Loader from '../components/Loader/Loader';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Message from '../components/Message/Message';
import API from '../API';

import './App.scss';

class App extends Component {

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
    this.returningUser = false;
    let HLBcookieCode = cookie.load('HLBcookieCode');
    if (HLBcookieCode === undefined) {
      HLBcookieCode = this.makeCookieCode();
      const maxAge = 3600 * 24 * 365; // Will expire after 1 year (value is in number of sec.)
      cookie.save('HLBcookieCode', HLBcookieCode, {
        maxAge
      });
    } else {
      this.returningUser = true;
    }
    cms.HLBcookieCode = HLBcookieCode;
    if (cms.init === undefined) {
      const api = new API(this.state.endPoint);
      api.getDataIfNeeded(`${this.state.endPoint}`, this.apiCallback.bind(this));
    } else {
      this.reRender();
    }
  }

  reRender() {
    this.setState({
      isLoaded: true
    });
  }

  apiCallback(cmsData) {
    cms.app = cmsData;
    this.setState({
      isLoaded: true
    });
  }

  makeRandomNumber(length) {
    return Math.floor(Math.pow(10, length - 1) + Math.random() *
    (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
  }

  makeRandomStr(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < length; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  makeCookieCode() {
    const cookieCode = `${this.makeRandomStr(3)}-${this.makeRandomNumber(3)}`;
    return cookieCode;
  }

  hideMessage() {
    $('#message').hide();
  }

  fadeInMessage() {
    $('#message').fadeIn(1500);
  }

  render() {
    const { children } = this.props;
    const firstMessage = `<p>Your unique cookie code is <strong>${cms.HLBcookieCode}</strong></p>
    <p>Please quote this as a reference if you have any problems of issues with this website.</p>`;
    const firstTitle = 'Hello and welcome';
    const secondMessage = '';
    const secondTitle = `Welcome back, ${cms.HLBcookieCode}`;
    let title = firstTitle;
    let message = firstMessage;
    if (this.returningUser) {
      title = secondTitle;
      message = secondMessage;
    }
    const messageType = 'warning';
    const showDismiss = true;
    const showCookies = false;
    const showDeleteCookies = true;
    const showSuppress = true;
    this.showMessages = true;
    const HLBcookieSuppress = cookie.load('HLBcookieSuppress');
    if (HLBcookieSuppress === 'yes') {
      this.showMessages = false;
    }
    // If we're loading show the loader
    if (!this.state.isLoaded) {
      const loaderText = 'Loading Healthy Lunchbox';
      const loader = (
        <div className="container">
          <Loader
            text={loaderText}
          />
        </div>);
      return loader;
    }
    if (!this.showMessages) {
      return (
        <div className="template-app">
          <Header />
          {children}
          <Footer />
        </div>
      );
    }
    return (
      <div className="template-app">
        <div id="message">
          <Message
            type={messageType}
            showDismiss={showDismiss}
            showCookies={showCookies}
            showDeleteCookies={showDeleteCookies}
            showSuppress={showSuppress}
            title={title}
            message={message}
             />
        </div>
        <Header />
        {children}
        <Footer />
      </div>
    );
  }
}

export default App;