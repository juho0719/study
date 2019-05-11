export class Post {
	constructor(config) {
		this.id = config.id || uuid();
		this.comments = config.comments || [];
		this.content = config.content || null;
		this.date = config.date || new Date().getTime();
		this.image = config.image || null;
		this.likes = config.likes || [];
		this.link = config.link || null;
		this.location = config.location || null;
		this.userId = config.userId;
	}
}