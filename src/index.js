document.addEventListener('DOMContentLoaded', function() {
  const imageId = 77 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  // const imageContentDiv = document.querySelector('#image_content')
  const imgCard = document.querySelector('#image_card')

  fetch(imageURL)
    .then(res => res.json())
    .then(img => {
      populateImgCard(new Image(img))
    })

  document.addEventListener('click', (e) => {
    if (e.target.id === "like_button"){
      incrementLikes(imgCard.dataset.id)
    }
  })

  document.addEventListener('submit', (e)=> {
    if (e.target.id === 'comment_form'){
      e.preventDefault()
      if (document.querySelector("#comment_input").value.trim() == "") {
        alert("input valid comment")
      } else {
        createNewComment(imgCard.dataset.id)
        
      }
    }
  })

  document.addEventListener('click', (e) => {
    if (e.target.className === 'delete-button'){
      deleteComment(e.target.dataset.commentId)
    }
  })
})

// function deleteComment(commentId){
//   const commentsSection = document.querySelector('#comments')
//   fetch(`https://randopic.herokuapp.com/comments/${:commentId}`, {
//     method: "DELETE"
//   })

//   console.log(document.querySelector(`li[data-comment-id="${commentId}]`))
//   commentsSection.removeChild(document.querySelector(`li[dataset.commentId="${commentId}]"`))
// }

function populateImgCard(imgObj){
  const imgCard = document.querySelector('#image_card')
  const imgElement = document.querySelector('#image')
  const imgName = document.querySelector('h4#name')
  const likesCount = document.querySelector('span#likes')
  const commentsSection = document.querySelector('#comments')
  imgCard.dataset.id = imgObj.id

  imgElement.src = imgObj.url
  imgName.innerText = imgObj.name 
  likesCount.innerText = imgObj.like_count
  populateCommentSection(imgObj)
}

function incrementLikes(id) {
  const likesCount = document.querySelector('#likes')
  likesCount.innerText = parseInt(likesCount.innerText) + 1

  fetch("https://randopic.herokuapp.com/likes/", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: id
    })
  })
    .then(res => res.json())
    .then(json => console.log(json))
}

function createNewComment(imageId){
  const commentsSection = document.querySelector("#comments")
  const commentInput = document.querySelector("#comment_input")
  let newCommentLi = document.createElement('li')
  let newComment = new Comment(imageId, commentInput.value)

  newCommentLi.innerText= newComment.content
  let newCommentId = persistNewComment(newComment)
  
  let deleteButton = document.createElement('button')
  deleteButton.className = "delete-button"
  deleteButton.dataset.commentId = newCommentId
  deleteButton.innerText = "delete"
  newCommentLi.appendChild(deleteButton)
  
  commentsSection.appendChild(newCommentLi)
}

function populateCommentSection(imgObj) {
  const commentsSection = document.querySelector("#comments")
  while (commentsSection.firstChild){ commentsSection.removeChild(commentsSection.firstChild) }

  for (let comment of imgObj.comments) {
    let commentLi = document.createElement('li')
    let deleteButton = document.createElement('button')
    deleteButton.className = "delete-button"
    deleteButton.dataset.commentId = comment.id
    deleteButton.innerText = "delete"

    commentLi.innerText = comment.content
    commentLi.appendChild(deleteButton)
    commentsSection.appendChild(commentLi)
  } 
}

function persistNewComment(commentObj){
  fetch('https://randopic.herokuapp.com/comments', {
    method:"POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentObj)
  })
    .then(res => res.json())
    .then(newComment => {return newComment.id})
}