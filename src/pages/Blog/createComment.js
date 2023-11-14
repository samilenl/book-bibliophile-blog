const createComment = async(comment, setPost, setComment, id) => {
    try {
      if (comment) {
        let now = new Date()
        now = now.toISOString()
        const token = localStorage.getItem("token")
        const response = await fetch(`https://book-bilbliophile-api.up.railway.app/comments/${id}/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ text: comment })
        })
        console.log(response)
        if (response.status === 401) {
          return "Unauthorized"
        }
        setPost(prevState => ({
          ...prevState,
          comments: [ ...prevState.comments, {text: comment, user:{name: "You"}, createdAt: now} ]
        }))
        setComment("")
        console.log("Comment Created")
        
      }
    }
    catch (err) {
      console.log(err)
    }
}

export default createComment