import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Filter from 'bad-words';

const filter = new Filter();

export default class CreatePost extends Component {
	static propTypes = {

	}
	constructor(props) {
		super(props);
		this.state = {
			content: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handlePostChange = hits.handlePostChange.bind(this);
	}

	handlePostChange(e) {
		 const content = filter.clean(e.target.value);
		 this.setState(() => {
			 return {
				 content,
				 valid: content.length <= 280
			 };
		 });
	}
	handleSubmit() {
		console.log(this.state);
	}
	render() {
		return (
			<div className="create-post">
				<button onClick={this.handleSubmit}>Post</button>
				<textarea 
					value={this.state.content}
					onChange={this.handlePostChange}
					placeholder="What's on your mind?"
				/>
			</div>
		);
	}
}