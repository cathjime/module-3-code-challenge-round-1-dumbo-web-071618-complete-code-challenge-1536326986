class Comment {
  constructor(commentObj){
    this.id = commentObj.id  
    this.content = commentObj.content
  }

  updateId(id) {
    this.id = id
  }

  render() {
    let newCommentLi = document.createElement('li')
    newCommentLi.innerHTML = `
      ${this.content} <button class='delete-button' data-comment-id=${this.id}>delete</button>
    `
    return newCommentLi
  }
}
