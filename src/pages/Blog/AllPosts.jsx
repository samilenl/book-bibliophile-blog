import { useState, useEffect } from "react"
import PostCards from "../../components/PostCards"

const AllPosts = () => {
  const [posts, setPost] = useState({ all: [], isLoading: true })

  
  useEffect( () => {
      async function fetchData () {
        try {
          const allPosts = await fetch(`http://localhost:3000/posts`)
          const infos = await allPosts.json()
          console.log(infos)

          for (const post of infos.allPosts) {
            if (post.image !== null && post.image !== undefined) {
              post.imageUrl = `http://localhost:3000/images/${post.image}`
            }
            infos.commentCount.forEach((commentC) => {
              if (commentC._id === post._id) {
                post.commentCount  = commentC.count
              }
            })
          }

          setPost({
            all: infos.allPosts,
            isLoading: false
          })

        } catch (error) {
          console.log(error)
        }
      }

      fetchData()
  }, [])
  return (
    <>
      <h2 className="postsHdr">All Posts</h2>
      { posts.isLoading 
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
      : <PostCards list={posts.all} />
      }
    </>
  )
}

export default AllPosts