import * as DBServices from '../utils/DBServices'
export const GET_POSTS = 'GET_POSTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const SET_CATEGORY = 'SET_CATEGORY'
export const EDIT_POST = 'EDIT_POST'
export const ADD_POST = 'ADD_POST'

export const setCategory = (category) =>({
	type:SET_CATEGORY,
	category
})

export const postsById = (posts, actionType) =>({
  type: actionType,
  posts

})

export const getCategories = (categories) => ({
	type: GET_CATEGORIES,
	categories
});

/**Using thunk middleware to make asynchronous calls **/
export const fetchPosts = () => dispatch => (
  DBServices
      .fetchPostsFromServer()
      .then(posts => dispatch(postsById(posts, GET_POSTS)))
);

export const fetchCategories = () => dispatch => (
  DBServices
      .fetchCategoriesFromServer()
      .then(categories => dispatch(getCategories(categories)))
);

export const editPost = (data,id) => dispatch => (
  DBServices
      .editPostInDB(data,id)
      .then(post => dispatch(postsById(post,EDIT_POST)))
);

export const addPost = (data,id) => dispatch => (
  DBServices
      .addPostInDB(data,id)
      .then(post => dispatch(postsById(post,ADD_POST)))
);
