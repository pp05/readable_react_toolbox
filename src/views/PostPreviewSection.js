import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchPosts, fetchCategories} from '../actions';
import Modal from 'react-modal';
import PreviewPost from './PreviewPost';
import PostForm from './PostForm'
import Button from 'react-toolbox/lib/button/Button';
//import IconButton from 'react-toolbox/lib/button/IconButton';
import sortBy from 'sort-by'
//import { Button } from 'semantic-ui-react';
//import { List } from 'semantic-ui-react'
import List from 'react-toolbox/lib/list/List';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListDivider from 'react-toolbox/lib/list/ListDivider';
import Link from 'react-toolbox/lib/link/Link';
// ListSubHeader, ListDivider, ListCheckbox } 
class PostPreviewSection extends Component {

	sortBy = {
		TIME : {field : 'timestamp', label:'Sort By Time'},
		VOTES : {field: 'voteScore', label:'Vote Score'}
	}
	state = {
		categorySelected :this.props.categorySelected,
		sortBy: this.sortBy.TIME.field,
		sortOrder: '',
		postModalOpen:false,
		selectedPost : '',
		modalLabel : ''
	}

  componentWillMount () {
  	//this.props.fetchCategories();
    this.props.fetchPosts();    
  }
  sortButtonClicked = (sortBy) =>{
  	//if the same button is clicked change the sorting order
  	if(sortBy == this.state.sortBy)
  	{
  		var sortOrder = this.state.sortOrder == '-' ? '':'-';
  		this.setState({sortOrder:sortOrder});
  	}
  	else{
  		this.setState({sortBy:sortBy});
  	}
  }

  closePostModal = () =>{
  	this.setState({postModalOpen:false});
  }

  openPostModal = (modalLabel) =>{
  	var modalLabelVal = modalLabel !=='' ? modalLabel : 'Create Post';
  	this.setState({postModalOpen:true, modalLabel:modalLabelVal});
  }

  editPost =(postId) =>{
  	this.setState({selectedPost : postId})
  	this.openPostModal('Edit Post');
  }

	getButtonJSX =(sortByObj) => {
		if(this.state.sortBy == sortByObj.field){
		return <Button icon={this.state.sortOrder == '-' ? 'arrow_drop_down': 'arrow_drop_up'} 
			  				label={sortByObj.label}
			  				 raised accent
			  				 onClick={() => this.sortButtonClicked(sortByObj.field)} />
		}
		else{
			return <Button icon={this.state.sortOrder == '-' ? 'arrow_drop_down': 'arrow_drop_up'} 
			  				label={sortByObj.label}
			  				 raised neutral
			  				 onClick={() => this.sortButtonClicked(sortByObj.field)} />
		}
	}	

	render(){
		const {posts} = this.props ;
		//sort the posts using the sortby api
		posts.sort(sortBy(this.state.sortOrder + this.state.sortBy));
		console.log('PostPreviewSection rerendered');
		return (		
			<div>
			<ListSubHeader caption='Posts' />
			<Button primary label='New Post' icon='speaker_notes' onClick={()=>this.openPostModal("New Post")} />
			 <List selectable ripple>
			 	
			  {Object.values(this.sortBy).map((sortByObj) => {
			  		return this.getButtonJSX(sortByObj)
			  	 })
			   }
			 	
              {posts.map((post)=>(              	
              		<PreviewPost postId={post.id} postSelected={this.editPost}/>)) 
              }
            </List>

            <Modal 	className='modal' overlayClassName='overlay' isOpen={this.state.postModalOpen}
          		onRequestClose={this.closePostModal} contentLabel='Post' ariaHideApp={false} 
          		contentLabel={this.state.modalLabel}>
          		<div className='modalLabel'><span>{`${this.state.modalLabel}`}</span></div>
          		<PostForm  postId={this.state.selectedPost} closePostModal ={this.closePostModal}/>
        	</Modal	>
            </div>
			)
	}

}
/**
	mapStateToProps recieves the state and whatever is set here is set as the props for
	current component ie. PostPreviewSection. connect method below binds this
**/
function mapStateToProps(state){
	return {
		posts: (Object.values(state.postsById)).filter(
				(post)=>{
					if(state.setCategory.category == 'All_Categories')
						return post;
					else
					return post.category == state.setCategory.category}),
		categorySelected : state.setCategory.category
	}
}

/**
The below allows PostPreviewSection to call this.fetchPosts instead of having to call
this.props.dispatch(actioncreatorname)
**/
function mapDispatchToProps(dispatch){
	return{
		fetchPosts : () => {
			console.log('I am in fetchPosts')
			dispatch(fetchPosts())}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(PostPreviewSection)
