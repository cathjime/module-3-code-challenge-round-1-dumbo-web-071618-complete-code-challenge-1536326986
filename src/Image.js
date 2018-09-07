class Image {
    constructor({id, url, name, like_count, comments}) {
        this.id = id 
        this.url = url 
        this.name = name 
        this.like_count = like_count 
        this.comments = comments 
    }

    loadImage() {
        ImageAdapter.fetchImg()
            .then(res => res.json())
            .then(img => {
                this.comments = img.comments
            })
    }

    renderCommentList() {
        // ...you get the idea...
    }

}
