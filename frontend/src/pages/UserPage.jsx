import { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import Post from '../components/Post'
import { useParams } from 'react-router-dom'
import useShowToast from '../hooks/useShowToast'
import { Flex, Spinner } from '@chakra-ui/react'
import useGetUserProfile from '../hooks/useGetUserProfile'

const UserPage = () => {
  const {user,loading} = useGetUserProfile()

  const [posts,setPosts] = useState([])
  const [fetchingPost,setFetchingPost] = useState(true)
  const {username} = useParams()
  const showToast = useShowToast();

  useEffect(()=>{
    const getPosts = async () =>{
      if(!user) return
      try {
        const res = await fetch(`/api/posts/user/${username}`)
        const data = await res.json();
        setPosts(data)
      } catch (error) {
        showToast("Error",error.message,"error")
        setPosts([])
      }finally{
        setFetchingPost(false)
      }
    }

    getPosts();

  },[username,user])
    
    
  

  if(!user && loading){
    return (
      <Flex justifyContent={"center"}>
              <Spinner size="xl" />
      </Flex>
    )
  }

  if(!user && !loading){
    return <h1>User Not Found</h1>
  }
  return (
    <>
    <UserHeader user={user}/>
    {!fetchingPost && posts.length === 0 && <h1>User has no posts.</h1>}
    {fetchingPost && (
      <Flex justifyContent={"center"} my={12}>
        <Spinner size={"xl"} />
      </Flex>
    )}
    {posts.map((post)=>(
      <Post key={post._id} post={post} />
    ))}
    </>
  )
}

export default UserPage