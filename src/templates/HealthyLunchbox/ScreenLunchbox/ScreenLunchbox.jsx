/* global cms */
/* global editor */
/**
 * Created by Chris Dorward on 04/02/2017
 * components/ScreenLunchbox/ScreenLunchbox
 */

import React from 'react';
import { browserHistory } from 'react-router';
import YourTip from '../YourTip/YourTip';


function ScreenLunchbox() {
  const foodgroupClicked = (foodgroup) => {
    cms.builder.currentFoodgroup = foodgroup;
    browserHistory.push(`/healthy-lunch-box/${cms.builder.currentFoodgroup}`);
  };

  const startOver = () => {
    location.reload();
  };

  const makeMarkup = (html) => {
    return { __html: html };
  };

  const lunchboxHeader = cms.app.data.lunchbox.content.data.lunchbox_header || '';

  let breadsTitle = null;
  let dairyTitle = null;
  let fruitTitle = null;
  let meatTitle = null;
  let vegetablesTitle = null;
  let waterTitle = null;
  let breadsIcon = null;
  let dairyIcon = null;
  let fruitIcon = null;
  let meatIcon = null;
  let vegetablesIcon = null;
  let waterIcon = null;

  for (let i = 0; i < cms.app.data.lunchbox.foodgroups.length; i += 1) {
    switch (cms.app.data.lunchbox.foodgroups[i].category.slug) {
    case 'breads-cereals':
      breadsTitle = cms.app.data.lunchbox.foodgroups[i].info.foodgroup_name;
      breadsIcon = cms.app.data.lunchbox.foodgroups[i].info.icon;
      break;
    case 'dairy':
      dairyTitle = cms.app.data.lunchbox.foodgroups[i].info.foodgroup_name;
      dairyIcon = cms.app.data.lunchbox.foodgroups[i].info.icon;
      break;
    case 'fruit':
      fruitTitle = cms.app.data.lunchbox.foodgroups[i].info.foodgroup_name;
      fruitIcon = cms.app.data.lunchbox.foodgroups[i].info.icon;
      break;
    case 'meat-alternatives':
      meatTitle = cms.app.data.lunchbox.foodgroups[i].info.foodgroup_name;
      meatIcon = cms.app.data.lunchbox.foodgroups[i].info.icon;
      break;
    case 'vegetables-salads':
      vegetablesTitle = cms.app.data.lunchbox.foodgroups[i].info.foodgroup_name;
      vegetablesIcon = cms.app.data.lunchbox.foodgroups[i].info.icon;
      break;
    case 'water':
      waterTitle = cms.app.data.lunchbox.foodgroups[i].info.foodgroup_name;
      waterIcon = cms.app.data.lunchbox.foodgroups[i].info.icon;
      break;
    default:
      break;
    }
  }
  let yourTips = [];
  let completedItems = 0;
  let cereals = null;
  if (cms.builder.cereals === 0) {
    cereals = (
      <div
        onClick={() => foodgroupClicked('breads-cereals')}
        className="itemClickable row builder-1-bottom-dash builder-1-right-dash builder-screen-1-tile"
      >
        <div
          className="col-xs-5 col-md-5 builder-screen-1-tile-center">
          <img
            alt={breadsTitle}
            src={breadsIcon}
            className="builder-screen-1-img builder-screen-1-align img-responsive"
          />
        </div>
        <div
          className="col-xs-7 col-md-7 builder-screen-1-align">
          <h2 dangerouslySetInnerHTML={makeMarkup(breadsTitle)} />
        </div>
      </div>);
  } else {
    completedItems += 1;
    const key = `yourTips_${completedItems}`;
    yourTips.push(
      <YourTip
        key={key}
        tipData={cms.builder.cereals}
      />
    );
    cereals = (
      <div
        onClick={() => foodgroupClicked('breads-cereals')}
        className="itemSelected row builder-1-bottom-dash builder-1-right-dash builder-screen-1-tile"
      >
        <div
          className="col-xs-5 col-md-5 builder-screen-1-tile-center">
          <img
            alt={breadsTitle}
            src={cms.builder.cereals.acf.image || breadsIcon}
            className="builder-screen-1-img builder-screen-1-align img-responsive"
          />
        </div>
        <div
          className="col-xs-7 col-md-7 builder-screen-1-align">
          <h2 dangerouslySetInnerHTML={makeMarkup(breadsTitle)} />
        </div>
      </div>);
  }

  let salad = null;
  if (cms.builder.salad === 0) {
    salad = (
      <div
        onClick={() => foodgroupClicked('vegetables-salads')}
        className="itemClickable row builder-1-right-dash builder-screen-1-tile"
      >
        <div className="col-xs-5 col-md-5 builder-screen-1-tile-center">
          <img
            alt={vegetablesTitle}
            src={vegetablesIcon}
            className="builder-screen-1-img builder-screen-1-align img-responsive"
          />
        </div>
        <div className="col-xs-7 col-md-7 builder-screen-1-align">
          <h2 dangerouslySetInnerHTML={makeMarkup(vegetablesTitle)} />
        </div>
      </div>
    );
  } else {
    completedItems += 1;
    const key = `yourTips_${completedItems}`;
    yourTips.push(
      <YourTip
        key={key}
        tipData={cms.builder.salad}
      />
    );
    salad = (
      <div
        onClick={() => foodgroupClicked('vegetables-salads')}
        className="itemSelected row builder-1-right-dash builder-screen-1-tile"
      >
        <div className="col-xs-5 col-md-5 builder-screen-1-tile-center">
          <img
            alt={vegetablesTitle}
            src={cms.builder.salad.acf.image || vegetablesIcon}
            className="builder-screen-1-img builder-screen-1-align img-responsive"
          />
        </div>
        <div className="col-xs-7 col-md-7 builder-screen-1-align">
          <h2 dangerouslySetInnerHTML={makeMarkup(vegetablesTitle)} />
        </div>
      </div>
    );
  }

  let meat = null;
  if (cms.builder.meat === 0) {
    meat = (
      <div
        onClick={() => foodgroupClicked('meat-alternatives')}
        className="itemClickable col-xs-4 builder-1-right-dash builder-1-top-dash builder-screen-1-tile builder-screen-1-tile-center "
      >
        <img
          alt={meatTitle}
          src={meatIcon}
          className="builder-screen-1-img img-responsive"
        />
      <h2 dangerouslySetInnerHTML={makeMarkup(meatTitle)} />
      </div>
    );
  } else {
    completedItems += 1;
    const key = `yourTips_${completedItems}`;
    yourTips.push(
      <YourTip
        key={key}
        tipData={cms.builder.meat}
      />
    );
    meat = (
      <div
        onClick={() => foodgroupClicked('meat-alternatives')}
        className="itemSelected col-xs-4 builder-1-right-dash builder-1-top-dash builder-screen-1-tile builder-screen-1-tile-center "
      >
        <img
          alt={meatTitle}
          src={cms.builder.meat.acf.image || meatIcon}
          className="builder-screen-1-img img-responsive"
        />
      <h2 dangerouslySetInnerHTML={makeMarkup(meatTitle)} />
      </div>
    );
  }

  let dairy = null;
  if (cms.builder.dairy === 0) {
    dairy = (
      <div
        onClick={() => foodgroupClicked('dairy')}
        className="itemClickable col-xs-4 builder-1-right-dash builder-1-top-dash builder-screen-1-tile builder-screen-1-tile-center"
      >
        <img
          alt={dairyTitle}
          src={dairyIcon}
          className="builder-screen-1-img img-responsive"
        />
      <h2 dangerouslySetInnerHTML={makeMarkup(dairyTitle)} />
      </div>
    );
  } else {
    completedItems += 1;
    const key = `yourTips_${completedItems}`;
    yourTips.push(
      <YourTip
        key={key}
        tipData={cms.builder.dairy}
      />
    );
    dairy = (
      <div
        onClick={() => foodgroupClicked('dairy')}
        className="itemSelected col-xs-4 builder-1-right-dash builder-1-top-dash builder-screen-1-tile builder-screen-1-tile-center"
      >
        <img
          alt={dairyTitle}
          src={cms.builder.dairy.acf.image || dairyIcon}
          className="builder-screen-1-img img-responsive"
        />
      <h2 dangerouslySetInnerHTML={makeMarkup(dairyTitle)} />
      </div>
    );
  }

  let fruit = null;
  if (cms.builder.fruit === 0) {
    fruit = (
      <div
        onClick={() => foodgroupClicked('fruit')}
        className="itemClickable col-xs-4 builder-1-top-dash builder-screen-1-tile builder-screen-1-tile-center"
      >
        <img
          alt={fruitTitle}
          src={fruitIcon}
          className="builder-screen-1-img img-responsive"
        />
      <h2 dangerouslySetInnerHTML={makeMarkup(fruitTitle)} />
      </div>
    );
  } else {
    completedItems += 1;
    const key = `yourTips_${completedItems}`;
    yourTips.push(
      <YourTip
        key={key}
        tipData={cms.builder.fruit}
      />
    );
    fruit = (
      <div
        onClick={() => foodgroupClicked('fruit')}
        className="itemSelected col-xs-4 builder-1-top-dash builder-screen-1-tile builder-screen-1-tile-center"
      >
        <img
          alt={fruitTitle}
          src={cms.builder.fruit.acf.image || fruitIcon}
          className="builder-screen-1-img img-responsive"
        />
      <h2 dangerouslySetInnerHTML={makeMarkup(fruitTitle)} />
      </div>
    );
  }

  let water = null;
  if (cms.builder.water === 0) {
    water = (
      <div
        onClick={() => foodgroupClicked('water')}
        className="itemClickable col-xs-4 builder-screen-1-item water-tile"
      >
        <div className="row builder-screen-1-tile builder-screen-1-tile-center">
          <img
            alt={waterTitle}
            src={waterIcon}
            className="builder-screen-1-img-water img-responsive"
          />
        <h2 dangerouslySetInnerHTML={makeMarkup(waterTitle)} />
        </div>
      </div>
    );
  } else {
    completedItems += 1;
    const key = `yourTips_${completedItems}`;
    yourTips.push(
      <YourTip
        key={key}
        tipData={cms.builder.water}
      />
    );
    water = (
      <div
        onClick={() => foodgroupClicked('water')}
        className="itemSelected col-xs-4 builder-screen-1-item water-tile"
      >
        <div className="row builder-screen-1-tile builder-screen-1-tile-center">
          <img
            alt={waterTitle}
            src={waterIcon}
            className="builder-screen-1-img-water img-responsive"
          />
        <h2 dangerouslySetInnerHTML={makeMarkup(waterTitle)} />
        </div>
      </div>
    );
  }

  let promptSmall = null;
  let promptLarge = null;
  if (completedItems === 0) {
    promptSmall = cms.app.data.lunchbox.content.data.completed_items_s_0 || '';
    promptLarge = cms.app.data.lunchbox.content.data.completed_items_l_0 || '';
  }
  if (completedItems === 1) {
    promptSmall = cms.app.data.lunchbox.content.data.completed_items_s_1 || '';
    promptLarge = cms.app.data.lunchbox.content.data.completed_items_l_1 || '';
  }
  if (completedItems === 2) {
    promptSmall = cms.app.data.lunchbox.content.data.completed_items_s_2 || '';
    promptLarge = cms.app.data.lunchbox.content.data.completed_items_l_2 || '';
  }
  if (completedItems === 3) {
    promptSmall = cms.app.data.lunchbox.content.data.completed_items_s_3 || '';
    promptLarge = cms.app.data.lunchbox.content.data.completed_items_l_3 || '';
  }
  if (completedItems === 4) {
    promptSmall = cms.app.data.lunchbox.content.data.completed_items_s_4 || '';
    promptLarge = cms.app.data.lunchbox.content.data.completed_items_l_4 || '';
  }
  if (completedItems === 5) {
    promptSmall = cms.app.data.lunchbox.content.data.completed_items_s_5 || '';
    promptLarge = cms.app.data.lunchbox.content.data.completed_items_l_5 || '';
  }
  if (completedItems === 6) {
    promptSmall = cms.app.data.lunchbox.content.data.completed_items_s_finished || '';
    promptLarge = cms.app.data.lunchbox.content.data.completed_items_l_finished || '';
  }

  return (
    <div className="healthy-lunch-box">
    <div className="container">

      <div className="row margin-bottom-10">
        <div className="builder-screen-1-lunchbox-heading">
          <div className="builder-screen-1-lunchbox-title">
            <h1>{lunchboxHeader}</h1>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="builder-screen-1">
          <div className="builder-screen-1-lunchbox">
            <div className="row builder-1-row-responsive">
              <div className="col-xs-8 builder-screen-1-item">
                {cereals}
                {salad}
              </div>
                {water}
            </div>
            <div className="row row-eq-height builder-1-row-responsive">
              {meat}
              {dairy}
              {fruit}
            </div>
            <div className="border-1-item-tab" />

          </div>

          <div className="builder-1-start-over-button">
            <button
              onClick={startOver}
              className="btn blue-circle-button"
            >
            <img
              alt="start over"
              src="/img/builder/start-over-arrow.png"
              className="img-responsive builder-1-start-over-icon"
            />
            <h4>START<br />OVER</h4>
            </button>
          </div>

        </div>


      </div>

    </div>
    <div className="border-1-prompt-box">
      <h4>{promptSmall}</h4>
      <h3>{promptLarge}</h3>
    </div>

    <div className="finished-tips">
      <h2>Your lunchbox tips</h2>
      <div className="container">
        <div className="row">
          {yourTips}
        </div>
      </div>
    </div>

  </div>
  );
}

ScreenLunchbox.propTypes = {

};

export default ScreenLunchbox;

/*
// import EditLink from '../../../components/EditLink/EditLink';
const editURL = 'http://api.healthylunchbox.com.au/wp-admin/post.php?post=1083&action=edit';
let editBtn = null;
if (editor) { editBtn = (<EditLink editUrl={editURL || ''} />); }
*/
