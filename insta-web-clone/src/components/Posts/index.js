import React from 'react';
import gql from 'graphql-tag';
import Post from '../Post';

class Posts extends React.Component {
	constructor() {
		super();
		this.state = {
			posts: []
		}
	}

	componentDidMount() {
		//fetch the inital posts
		this.props.apollo_client
			.query({
				query: gql`
				{
					posts(user_id: "a") {
						id
						user{
							nickname
							avatar
						}
						image
						caption
					}
				}
			`})
			.then(response => {
				this.setState({ posts: response.data.posts });
			});
		// subscribe to posts channel
		this.posts_channel = this.props.pusher.subscribe('posts-channel');

		// listen for a new post
		this.posts_channel.bind("new-post", data => {
			this.setState({ posts: this.state.posts.concat(data.post) });
		}, this);
	}

	render() {
		return (
			<div>
				{this.state.posts.map(post => <Post nickname={post.user.nickname} avatar={post.user.avatar} image={post.image} caption={post.caption} key={post.id} />)}
			</div>
		);
	}
}
export default Posts;