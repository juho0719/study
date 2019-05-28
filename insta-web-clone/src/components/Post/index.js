import React, { Component } from 'react';
import styled from 'styled-components';

const Article = styled.article`
	border-radius: 3px;
	border: 1px solid #e6e6e6;
	background-color: #fff;
	margin-bottom: 60px;
	margin-left: 20%;
	margin-right: 20%;
`;

const PostUser = styled.div`
	display: flex;
	padding: 16px;
	align-items: center;
`;

const PostUserAvatar = styled.div`
	width: 30px;
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

class Post extends Component {

	render() {
		return (
			<Article>
				<header>
					<PostUser>
						<PostUserAvatar>
							<PostUserAvatarImg src="https://www.laravelnigeria.com/img/chris.jpg" alt="Chris" />
						</PostUserAvatar>
						<PostUserNickname>
							<span>Chris</span>
						</PostUserNickname>
					</PostUser>
				</header>
				<div className="Post-image">
					<PostImageBg>
						<PostImageImg alt="Icon Living" src="https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg" />
					</PostImageBg>
				</div>
				<PostCaption>
					<PostCaptionStrong>Chris</PostCaptionStrong> Moving the community
				</PostCaption>
			</Article>
		);
	}
}
export default Post;