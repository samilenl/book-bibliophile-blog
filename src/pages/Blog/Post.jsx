import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { formatDate } from "../formatTime.js"
import createComment from "./createComment.js"
import parse from 'html-react-parser';
import "../../assets/styles/Post.css"

const Post = () => {
    const { id } = useParams()
    const [comment, setComment] = useState("")
    const [post, setPost] = useState({ info: {}, comments: [], imageSrc: "", isLoading: true })
    const [Unauthorized, setUnauthorized] = useState(false)
    
    useEffect( () => {
        async function fetchData () {
          try {
            const thisPost = await fetch(`http://localhost:3000/posts/${id}`)
            const postInfo = await thisPost.json()
            const imageId = postInfo.post.image;
            let data = ''
            if (imageId !== null && imageId !== undefined) {
              data = (`http://localhost:3000/images/${imageId}`)
            }

            setPost({
              info: postInfo.post,
              comments: postInfo.postComments,
              imageSrc: data ? data : "",
              isLoading: false
            })
          } catch (error) {
            console.log(error)
          }
        }

        fetchData()
    }, [id])

    const commentIfAuth = async() => {
      const response = await createComment(comment, setPost, setComment, id)
        console.log(response)
      if (response === "Unauthorized") {
        setUnauthorized(true)
      }
    }

    return (
      <>
        { post.isLoading 
          ? <div className="spinner-wrapper">
              <div className="spinner">
              <div className="sk-folding-cube">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
              </div>
              </div>
            </div>  
          : <>
              <div className="post-header">
                <h1>{post.info.title}</h1>
              </div>
              <div className="post-image">
                <img src={post.imageSrc && post.imageSrc} alt=""/>
              </div>
              <div>
                
                <p className="post-author">{post.info.author.name}</p>
                <div className="post-topics">
                  {post.info.topics.map((topic, index) => index > 0 ? `, ${<span className="" key={topic._id}>{topic.title}</span>}` : <span className="" key={topic._id}>{topic.title}</span>)}
                </div>
              </div>
              
      
              <article>
                {parse(post.info.text)}
              </article>

              <div className="cmtCntr">
                <h3 className="cmtHdr">Comments</h3>
                <div className="add-comment">
                  {Unauthorized && <p className="error-msg">You must be logged in to create a comment</p>}
                  <label>
                    <textarea name="coomentBox" id="comment-box" cols="30" rows="1" value={comment} onChange={e => setComment(e.target.value)} placeholder="Add A Comment"></textarea>
                  </label>
                  <button type="submit" onClick={commentIfAuth} id="comment-btn">Submit</button>
                </div>
                {(post.comments.length > 0) 
                  ? post.comments.map((comment, index) => {
                    return (
                      <div key={index} className="comments">
                        <p className="comment-user">{comment.user.name} says</p>
                        <p className="comment-text">{comment.text}</p>
                        <p className="comment-date"> {formatDate(comment.createdAt)} </p>
                      </div>
                    )
                  })
                  : <p className="no-comment">Be the first to comment</p>
                }
              </div>
          </>
          }
      </>
    )
}

export default Post