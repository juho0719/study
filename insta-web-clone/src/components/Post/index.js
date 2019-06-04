import React from 'react';
import styled from 'styled-components';

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

class Post extends React.Component {
	render() {
		const nickname = this.props.nickname;
		const avatar = this.props.avatar;
		const image = this.props.image;
		const caption = this.props.caption;
		return (
			<Article ref="Post">
				<PostHeader>
					<PostUser>
						<PostUserAvatar>
							<PostUserAvatarImg src={avatar} alt={nickname} />
						</PostUserAvatar>
						<PostUserNickname>
							<span>{nickname}</span>
						</PostUserNickname>
					</PostUser>
				</PostHeader>
				<div className="Post-image">
					<PostImageBg>
						<PostImageImg alt={caption} src={image} />
					</PostImageBg>
				</div>
				<PostCaption>
					<PostCaptionStrong>{nickname}</PostCaptionStrong> {caption}
				</PostCaption>
			</Article>
		);
	}
}
export default Post;