import React, { Component } from 'react';
import {connect} from 'react-redux';
import  ListItem from 'react-toolbox/lib/list/ListItem';
import  ListDivider from 'react-toolbox/lib/list/ListDivider';
//import { List } from  'semantic-ui-react'
//import '../../node_modules/react-toolbox/src/components/list/theme.css'
import '../assets/react-toolbox/theme.css';
class PreviewPost extends Component {

	formatDate =(timestamp) => {
		return new Date(timestamp).toLocaleString();
	}


	handleClick = () => {
		this.props.postSelected(this.props.post.id);
	}
	render (){
		const { category, id, title, author, timestamp } = this.props.post;
		const { postSelected} = this.props;
  		//Category: [{category}] | Author: {author} | Posted on: {this.formatDate(timestamp)}
  		//<div>{title}</div>
        //		<div>Category: [{category}] | Author: {author} | Posted on: {this.formatDate(timestamp)}</div>
		/**return (
			
            )**/
        return(
        	<div>
        		<ListItem  selectable
				caption ={title}
				legend = {`Category: [${category}] | Author: ${author} | Posted on: ${this.formatDate(timestamp)}`}            		
            	onClick = {this.handleClick}
            	> 
            </ListItem>
            <ListDivider/>
        	</div>
        	)

	}
}

function mapStateToProps(state, ownProps){
	return {
		post: state.postsById[ownProps.postId]
	}
}

export default connect(mapStateToProps)(PreviewPost)