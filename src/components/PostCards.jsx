import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import "../assets/styles/PostCards.css"
import arrow from "../assets/images/upper-right-arrow.png"



const PostCards = ({list, height, showOthers=false}) => {
  return (
    <div className="postCards loading-animation">
        {list.map((post, index) => {
          return (
            <Link key={index} to={`/posts/${post._id}`}>
              <div className="cards">
                <div className="cardImg" style={height && {height: "clamp(20vw, 60vw, 100vw)"} }>
                    <img src={post.imageUrl && post.imageUrl} style={height && {height: "clamp(20vw, 60vw, 100vw)"} } alt="" />
                </div>
                <div className="caWa">
                    <div className="arrow">
                        <img src={arrow} alt="" />
                    </div>
                    <h3>{post.title}</h3>
                    { showOthers === false ?
                    <>
                      <p>{post.commentCount} {post.commentCount === 1 ? "Comment": "Comments"} </p>
                      <div className="topics">
                          {post.topics.map(topic => <span className="topicsN" key={topic._id}>{topic.title}</span>)}
                      </div>
                    </>
                    : ""}
                </div>
                
              </div>
            </Link>
          )
        })}
    </div>
  )
}

PostCards.propTypes = {
    list: PropTypes.array.isRequired,
    showOthers: PropTypes.bool,
    height: PropTypes.string
}

export default PostCards