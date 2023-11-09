import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PostCards from "../../components/PostCards"

const Topic = () => {
    const { id } = useParams()
    const [topic, setTopic] = useState({ info: {}, posts: [], isLoading: true })

    
    useEffect( () => {
        async function fetchData () {
          try {
            const thisTopic = await fetch(`http://localhost:3000/topics/${id}`)
            const topicInfo = await thisTopic.json()

            for (const post of topicInfo.postWithTopic) {
              if (post.image !== null && post.image !== undefined) {
                const postImage = await fetch(`http://localhost:3000/images/${post.image}`)
                post.imageUrl = postImage.url
              }
            }

            setTopic({
              info: topicInfo.topic,
              posts: topicInfo.postWithTopic,
              isLoading: false
            })
          } catch (error) {
            console.log(error)
          }
        }

        fetchData()
    }, [id])
    return (
      <>
        {topic.isLoading 
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
          <h1 className="postsHdr">{topic.info.title}</h1>
          <div>
            { 
              (topic.posts.length > 0) 
              ? <PostCards list={topic.posts} showOthers={true}/>
              : <p> There are no posts with this topic </p>
            }
          </div>
          </>
          }
      </>
    )
}

export default Topic