/**
 * Created by Chris Dorward on 20/01/2017
 * actions/index.js
 *
 * Redux Actions are payloads of information that send data from your application
 * to your store. They are the only source of information for the store.
 * You send them to the store using store.dispatch().
 */

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_REDDIT = 'SELECT_REDDIT';
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';

export const selectReddit = reddit => ({
  type: SELECT_REDDIT,
  reddit
});

export const invalidateReddit = reddit => ({
  type: INVALIDATE_REDDIT,
  reddit
});

export const requestPosts = reddit => ({
  type: REQUEST_POSTS,
  reddit
});

export const receivePosts = (reddit, json) => ({
  type: RECEIVE_POSTS,
  reddit,
  posts: [],
  receivedAt: Date.now()
});

const fetchPosts = reddit => (dispatch) => {
  dispatch(requestPosts(reddit));
  const baseurl = 'http://api.healthylunchbox.com.au/wp-json/hlbapi/';
  const url = baseurl + reddit;
  console.log(`fetch > ${url}`);
  return fetch(url)
  // return fetch(`https://www.reddit.com/r/${reddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(reddit, json)));
};

const shouldFetchPosts = (state, reddit) => {
  const posts = state.postsByReddit[reddit];
  if (!posts) {
    return true;
  }
  if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
};

// eslint-disable-next-line consistent-return
export const fetchPostsIfNeeded = reddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), reddit)) {
    return dispatch(fetchPosts(reddit));
  }
};
