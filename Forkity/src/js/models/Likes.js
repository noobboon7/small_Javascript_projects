export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img){
    const like = { id, title, author, img };
    this.likes.push(like);
    return like;
  }

  deleteLike(id){
    const idx = this.likes.findIndex(el => el.id === id);
    this.likes.splice(idx, 1);
  }

  isliked(id){
    return this.likes.findIndex(el => el.id === id)
  }

  getLikes(){
    return this.likes.length;
  }
}