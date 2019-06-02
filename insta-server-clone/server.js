let express = require("express");
let graphqlHTTP = require("express-graphql");
let { buildSchema } = require("graphql");
let cors = require("cors");
let Pusher = require("pusher");
let bodyParser = require("body-parser");
let Multipart = require("connect-multiparty");

let pusher = new Pusher({
	appId: '795383',
	key: '561b437138b0fb79238c',
	secret: 'ccf5553a5d7d9f08bf0c',
	cluster: 'ap3',
	encrypted: true
});

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
		id: "kjh0719",
		nickname: "Kim",
		avatar: "http://localhost:4000/img/profile.png"
	}
};

let postslist = {
	a: {
		a: {
			id: "a",
			user: userslist["a"],
			caption: "My family",
			image: "http://localhost:4000/img/family.jpeg"
		},
		b: {
			id: "b",
			user: userslist["a"],
			caption: "Vue Book",
			image: "http://localhost:4000/img/family.jpeg"
		},
		c: {
			id: "c",
			user: userslist["a"],
			caption: "Angular Book",
			image: "http://localhost:4000/img/family.jpeg"
		},
		d: {
			id: "d",
			user: userslist["a"],
			caption: "Pure Javascript",
			image: "http://localhost:4000/img/family.jpeg"
		}
	}
};

let root = {
	user: function ({ id }) {
		return userslist[id];
	},
	post: function ({ user_id, post_id }) {
		return postslist[user_id][post_id];
	},
	posts: function ({ user_id }) {
		return Object.values(postslist[user_id]);
	}
};

let app = express();
app.use(cors());
app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true
	})
);
app.use('/img', express.static('img'));

// add middleware
let multipartMiddleware = new Multipart();

// trigger and a new post
app.post('/newpost', multipartMiddleware, (req, res) => {
	// create a sample post
	let post = {
		user: {
			nickname: req.body.name,
			avatar: req.body.avatar
		},
		image: req.body.image,
		caption: req.body.caption
	}
	// trigger pusher event
	pusher.trigger("posts-channel", "new-post", {
		post
	});
	return res.json({ status: "Post created" });
});

// set application port
app.listen(4000);