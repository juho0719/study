import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const Article = styled.article`
	border-radius: 3px;
	border: 1px solid #e6e6e6;
	background-color: #fff;
	margin-top: 77px;
	margin-bottom: 60px;
	margin-left: 20%;
	margin-right: 20%;
`;

const PostHeader = styled.header`
	height: 40px;
	vertical-align: center;
`;

const PostUser = styled.div`
	display: flex;
	padding: 5px;
	align-items: center;
`;

const PostUserAvatar = styled.div`
	width: 35px;
	height: 30px;
`;

const PostUserAvatarImg = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 50%;
`;

const PostUserNickname = styled.div`
	margin-left: 12px;
	font-family: 'PT Sans', sans-serif;
	font-weight: bold;
`;

const PostImageBg = styled.div`
	background-color: #efefef;
`;

const PostImageImg = styled.img`
	display: block;
	width: 100%;
`;

const PostCaption = styled.div`
	padding: 16px 16px;
`;

const PostCaptionStrong = styled.strong`
	font-family: 'PT Sans', sans-serif;
	font-weight: bold;
`;

const Post = () => {
	return (
		<Query
			query={gql`
				{
					post(user_id: "a", post_id: "a") {
						image
						caption
						user {
							nickname
							avatar
						}
					}
				}
			`}
		>
			{({ loading, error, data }) => {
				if (loading) return <p>Loading Post...</p>;
				if (error) return <p>Error loading Post:(</p>;
				let image = data.post.image;
				let caption = data.post.caption;
				let user = data.post.user;

				return (
					<Article ref="Post">
						<PostHeader>
							<PostUser>
								<PostUserAvatar>
									<PostUserAvatarImg src={user.avatar} alt={user.nickname} />
								</PostUserAvatar>
								<PostUserNickname>
									<span>{user.nickname}</span>
								</PostUserNickname>
							</PostUser>
						</PostHeader>
						<div className="Post-image">
							<PostImageBg>
								<PostImageImg alt={caption} src={image} />
							</PostImageBg>
						</div>
						<PostCaption>
							<PostCaptionStrong>{user.nickname}</PostCaptionStrong> {caption}
						</PostCaption>
					</Article>
				);
			}}
		</Query>
	);
};
export default Post;