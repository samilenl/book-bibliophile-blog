import "../../assets/styles/Home.css"
import PostCards from "../../components/PostCards"
import { useState, useEffect } from "react"
import ftdImg from "../../assets/images/image3.jpg"
import { Link } from "react-router-dom"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Home = () => {
  const [posts, setPost] = useState({ all: [], isLoading: true })
  useEffect(()=>{
    async function fetchData () {
      try {
        const recentPosts = await fetch(`https://book-bilbliophile-api.up.railway.app/posts/recent`)
        const infos = await recentPosts.json()
        
        for (const post of infos.recentPosts) {
          if (post.image !== null && post.image !== undefined) {
            post.imageUrl =`https://book-bilbliophile-api.up.railway.app/images/${post.image}`
          }
          infos.commentCount.forEach((commentC) => {
            if (commentC._id === post._id) {
              post.commentCount  = commentC.count
            }
          })
        }
        setPost({
          all: infos.recentPosts,
          isLoading: false
        })

      } catch (error) { console.log(error) }
    }
    fetchData()
  })
  
  return (
    <div>
      <div className="hh fade-in">
        <p className="hero1">Where book lovers unite to celebrate the joy of reading</p>
        <p className="hero2">The best book reviews and recommendations</p>
      </div>
      
      <div className="hero-content">
        <Link to={"/posts/65430bf8e98ef9c49d68bc22"}>
          <div className="imgCont">
            <img src={ftdImg} alt="" />
          </div>
          <div className="hero-text">
                <h1>Beautiful Resistance: Embracing Conviction in a Compromising World</h1>
                <div className="text-info">
                  <div>
                    <div className="infos">
                      <p className="info">Written By</p>
                      <p className="text">Bartholomew Dotter</p>
                    </div>
                    <div className="infos">
                      <p className="info">Published On</p>
                      <p className="text">November 2, 2023</p>
                    </div>
                  </div>
                  <div className="infos">
                    <p className="info">Topics</p>
                    <p className="desCont">
                      <span className="des">Christian Literature</span>
                      <span className="des">Topic Again</span>
                      <span className="des">Another One</span>
                    </p>
                  </div>
                </div>
            </div>
          </Link>
      </div>
      <div className="mobile-hero">
        <PostCards height={"fit-screen"} list={[{_id: "65430bf8e98ef9c49d68bc22", imageUrl: ftdImg, title: "Beautiful Resistance: Embracing Conviction in a Compromising World" }]} showOthers={true} />
      </div>
      <p className="recent">Recent Posts</p>
      <div>
        {posts.isLoading 
        ? <div className="hldCont">
            <Skeleton className="holderCards"  count={2}/>
          </div>
        : <PostCards list={posts.all}/>
        }
      </div>
      <p className="linkPosts">Like what you see? <strong><Link to={"/posts"}>Check out other posts.</Link></strong> </p>
    </div>
  )
}

export default Home