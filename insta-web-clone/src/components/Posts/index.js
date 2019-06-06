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
		//request permission
		Notification.requestPermission();
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
			//update state
			this.setState({ posts: this.state.posts.concat(data.post) });

			//check if notifications are permitted
			if (Notification.permission === 'granted') {
				try {
					//notify user of new Post
					new Notification('Pusher Instagram Clone', { body: `New post from ${data.post.user.nickname}` });
				} catch (e) {
					console.log('Error displaying notification')
				}
			}
		}, this);
	}

	render() {
		return (
			<div>
				{this.state.posts
					.slice(0)
					.reverse()
					.map(post => (
						<Post
							nickname={post.user.nickname}
							avatar={post.user.avatar}
							image={post.image}
							caption={post.caption}
							key={post.id}
						/>
					))
				}
			</div>
		);
	}
}
export default Posts;