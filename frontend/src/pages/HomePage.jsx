import { Flex, Spinner,Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import useShowToast from '../hooks/useShowToast'
import Post from "../components/Post"
import SuggestedUsers from "../components/SuggestedUsers"

const HomePage = () => {
  const [posts,setPosts] = useState([])
  const [loading,setLoading] = useState(false)
  const showToast = useShowToast();

  useEffect(()=>{
    const getFeedPosts = async()=>{
      setLoading(true)
      try {
        const res = await fetch('/api/posts/feed');
        const data = await res.json();
        if(data.error){
          showToast("Error",data.error,"error")
          return
        }
        setPosts(data)
      } catch (error) {
        showToast("Error",error.message,"error")
      }finally{
        setLoading(false)
      }
    }
    getFeedPosts()
  },[])

  return (
    <Flex gap={"10"} alignItems={"flex-start"}>
    <Box flex={70}>
    {loading && (
      <Flex justify={"center"}>
        <Spinner size={"xl"} />
      </Flex> 
    )}
    {!loading && posts.length === 0 && (
      <h1>Follow some users to see the feed</h1>
    )}

    {posts.map((post)=>(
      <Post key={post._id} post={post} />
    ))}
    </Box>
    <Box flex={30} display={{
      base:"none",
      md:"block",
    }} >
        <SuggestedUsers />
    </Box>
    </Flex>
  )
}

export default HomePage