import React, { Component } from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'
import PageContent from '../Content'
import NotFound from '../NotFound'

export default class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentWillMount() {
    const getPages = sessionStorage.getItem('pages')
    const slug = this.props.params.slug

    if(!getPages) {
      RequestManager.get(WP_PAGES).then(payload => {
        sessionStorage.setItem('pages', JSON.stringify(payload))
        let pageData = payload.filter(page => page.slug === slug)
        this.setState({data: pageData[0]})
      })
    }

    if(getPages) {
      const allPageData = JSON.parse(sessionStorage.getItem('pages'))
      const pageData = allPageData.filter(page => page.slug === slug)
      this.setState({data: pageData[0]})
    }
  }

  render() {
    return (
      <div className="container">
        { this.state.data ? <PageContent data={this.state.data}/> : <NotFound /> }
      </div>
    )
  }
}
