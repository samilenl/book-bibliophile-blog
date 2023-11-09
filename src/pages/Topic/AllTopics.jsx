import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const AllTopics = () => {
  const [topics, setTopic] = useState({ all: [], isLoading: true })

  
  useEffect( () => {
      async function fetchData () {
        try {
          const allTopics = await fetch(`http://localhost:3000/topics`)
          const infos = await allTopics.json()


          setTopic({
            all: infos,
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
      <h2 className="postsHdr">All Topics</h2>
      { topics.isLoading 
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
      : <div className="oneTopicss"> 
          {topics.all.map((topic, index) => {
            return (
              <Link key={index} to={`/topics/${topic._id}`}>
                <div className="oneTopic">
                  <p>{topic.title}</p>
                </div>
              </Link>
            )
          })}
        </div>
      
        
      }
    </>
  )
}

export default AllTopics