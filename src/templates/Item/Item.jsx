/* global editor */
/* global cms */
/**
 * Created by Chris Dorward on 22/01/2017
 * templates/Item/Item
 */

import React, { Component, PropTypes } from 'react';
import API from '../../API';
import Loader from '../../components/Loader/Loader';
import EditLink from '../../components/EditLink/EditLink';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

class Item extends Component {

  static propTypes = {
    routeParams: PropTypes.any
    // ID: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      slug: this.props.routeParams.slug
    };
    this.item = {};
  }

  componentDidMount() {
    let loadData = true;
    if (cms.items === undefined) {
      cms.items = [];
      loadData = true;
    } else if (cms.items !== undefined) {
      for (let i = 0; i < cms.items.length; i += 1) {
        if (cms.items[i].slug === this.state.slug) {
          // console.log('FOUND! do not load');
          this.item = cms.items[i];
          loadData = false;
          this.reRender();
        }
      }
    }
    if (loadData) {
      this.getData();
    }
  }

  getData() {
    const api = new API(`item/${this.state.slug}`);
    api.getData(`item/${this.state.slug}`, this.apiCallback.bind(this));
  }

  reRender() {
    this.setState({
      isLoaded: true
    });
  }

  apiCallback(itemData) {
    const item = {
      ID: itemData.data.ID,
      slug: itemData.data.post_name,
      data: itemData.data
    };
    this.item = item;
    cms.items.push(item);
    this.setState({
      isLoaded: true
    });
  }

  createMarkup(htmlText) {
    return { __html: htmlText };
  }

  render() {
    if (!this.state.isLoaded) {
      const loaderText = `Loading ${this.state.slug}`;
      const showLogo = false;
      const loader = (
        <div className="container">
          <Loader
            text={loaderText}
            showLogo={showLogo}
          />
        </div>);
      return loader;
    }
    let editBtn = null;
    if (editor) {
      editBtn = (
        <EditLink
          editUrl={`http://api.healthylunchbox.com.au/wp-admin/post.php?post=${this.item.ID}&action=edit`}
        />
      );
    }
    let image = null;
    if (this.item.data.acf.image !== false) {
      image = (
        <img
          className="img-responsive item-img"
          src={this.item.data.acf.image.url}
          alt={this.item.data.title}
        />);
    }
    let recipeInfo = null;
    if (this.item.data.post_type === 'recipe') {
      console.log(this.item.data.acf.cooking_time);
      let cookingTime = null;
      if (this.item.data.acf.cooking_time !== '') {
        cookingTime = (
          <div>Cooking time {this.item.data.acf.cooking_time} mins</div>
        );
      }
      let preparationTime = null;
      if (this.item.data.acf.preparation_time !== '') {
        preparationTime = (
          <div>Preparation time {this.item.data.acf.preparation_time} mins</div>
        );
      }
      let vegServes = null;
      if (this.item.data.acf.veg_serves !== '') {
        vegServes = (
          <div>Vegie servings {this.item.data.acf.veg_serves}</div>
        );
      }
      let ingredients = null;
      if (this.item.data.acf.ingredients !== '') {
        ingredients = (
          <div>
            <h4>Ingredients</h4>
            <div dangerouslySetInnerHTML={this.createMarkup(this.item.data.acf.ingredients)} />
          </div>
        );
      }
      recipeInfo = (

        <div className="item-content-pad">

          <div className="item-content-meta">
            <h3>{cookingTime}
            {preparationTime}
            {vegServes}</h3>
          </div>

          <div className="item-content-ingredients">
            {ingredients}
          </div>

        </div>
      );
    }
    return (
      <div className="">
        <Breadcrumb />
        <div className="item container">
          <div className="raised-page">
            <h1>{this.item.data.title}</h1>
            {image}
            {recipeInfo}
          </div>
        </div>
        <div className="margin-top-25">
          {editBtn}
        </div>
      </div>
    );
  }
}

export default Item;

/*
<p>This page is a <strong>{this.item.data.post_type}</strong> page</p>
<small>WordPress ID: <strong>{this.item.ID}</strong></small>

<img
  className="img-responsive item-img"
  alt={this.item.data.title}
  src="/img/defaults/RecipeImage.jpg"
  />
*/
