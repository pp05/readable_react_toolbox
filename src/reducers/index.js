/**
	Reducer class for 
**/

import { combineReducers } from 'redux';
import {
	GET_POSTS,
	GET_CATEGORIES,
	SET_CATEGORY,
	EDIT_POST,
	ADD_POST
} from '../actions'

function postsById (state={}, action){
	switch(action.type){
		case GET_POSTS : 		

		//object spread syntax, return the same state but with new content
			return {...state, ...createObj(action.posts)};
		case EDIT_POST: 
		case ADD_POST :
			return  {...state, [action.posts.id] : action.posts};
		default :
			return state;
	}
}

function getCategories(state ={}, action){
	switch (action.type){
		case GET_CATEGORIES:
			return  {...state,  ...action.categories['categories']}
		default :
			return state;
	}

}

function setCategory(state=null, action){
	switch(action.type){
		case SET_CATEGORY: 
		 const { category } = action
		 return {...state, ['category'] : category}
		default: return state;
	}
}

function createObj (items) {
  const newObj = {}
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const itemId = item.id
    newObj[itemId] = item
  }
  return newObj
}

export default combineReducers({
	postsById,
	getCategories,
	setCategory
})