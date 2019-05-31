let express = require("express");
let graphqlHTTP = require("express-graphql");
let { buildSchema } = require("graphql");
let cors = require("cors");

let schema = buildSchema(`
	type User {
		id: String!
		nickname: String!
		avatar: String!
	}
	type Post {
		id: String!
		user: User!
		caption: String!
		image: String
	}
	type Query {
		user(id: String): User!
		post(user_id: String, post_id: String): Post!
		posts(user_id: String): [Post]
	}
`);

let userslist = {
	a: {
		id: "a",
		nickname: "Kim",
		avatar: ""
	}
};

let postslist = {
	a: {
		a: {
			id: "a",
			user: userslist["Kim"],
			caption: "React Book",
			image: ""
		},
		b: {
			id: "b",
			user: userslist["Lee"],
			caption: "Vue Book",
			image: ""
		},
		c: {
			id: "c",
			user: userslist["Park"],
			caption: "Angular Book"
		}
	}
}