import { Box, Flex, Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import {Link, useNavigate} from 'react-router-dom'
import { Image,Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  Spinner} from '@chakra-ui/react'
import Actions from './Actions'
import { useEffect, useState } from 'react'
import useShowToast from '../hooks/useShowToast'
import {formatDistanceToNow} from 'date-fns'
import {DeleteIcon} from '@chakra-ui/icons'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'

const Post = ({post}) => {

  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom)
  const [liked,setLiked] = useState(false)
  const [user,setuser] = useState({})
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
      const getUser = async()=>{
        setLoading(true)
        try {
          const res = await fetch(`/api/users/profile/${post.postedBy}`)
          const data = await res.json();
          if(data.error){
            showToast("Error",data.error,"error")
            return
          }
          setuser(data)
        } catch (error) {
          showToast("Error",error.message,"error")
        }finally{
          setLoading(false)
        }
      }
      getUser()
  },[post.postedBy])

  const handleDeletePost = async (e) =>{
    try {
      e.preventDefault();
      if(!window.confirm("Are you sure you want to delete this post?")) return;
      const res = await fetch(`/api/posts/${post._id}`,{
        method:"DELETE"
      })
      const data = await res.json();
      if(data.error){
        showToast("Error",data.error,"error")
        return
      }
      showToast("Success","Post deleted","success")
    } catch (error) {
      showToast("Error",error.message,"error")
    }
  }


  return loading ? <Spinner size={"xl"} /> : (
    <Link to={`/${user.username}/post/${post._id}`}>
      <Flex gap={3} mb={4} py={5}>
    <Flex flexDirection={"column"} alignItems={"center"}>
      <Avatar size="md" name={user?.name} src={user?.profilePic} 
      onClick={(e)=>{
        e.preventDefault();
        navigate(`${user.username}`)
      }}
      />
      <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
      <Box position={"relative"} w={"full"}>
        {post.replies.length === 0 && <Text textAlign={"center"}>
          😂
        </Text>}


        {post.replies[0] && (
                  <Avatar 
                  size={"xs"}
                  name='John doe'
                  src={post.replies[0].userProfilePic}
                  position={"absolute"}
                  top={"0px"}
                  left="15px"
                  padding={"2px"}
                />
        )}
       
       {
        post.replies[1] && (
          <Avatar 
          size={"xs"}
          name='Prosper Otemuyiwa'
          src={post.replies[1].userProfilePic}
          position={"absolute"}
          bottom={"0px"}
          right="-5px"
          padding={"2px"}
        />
        )
       }
           {
        post.replies[2] && (
          <Avatar 
          size={"xs"}
          name='Prosper Otemuyiwa'
          src={post.replies[2].userProfilePic}
          position={"absolute"}
          bottom={"0px"}
          right="-5px"
          padding={"2px"}
        />
        )
       }
      </Box>
    </Flex>
    {/* POST RIGHT SIDE */}
    <Flex flex={1} flexDirection={"column"} gap={2}>
      <Flex justifyContent={"space-between"} w={"full"}> 
          {/* Left ONe */}
          <Flex w={"full"} alignItems={"center"}>
            <Text fontSize={"sm"} fontWeight={"bold"}    onClick={(e)=>{
        e.preventDefault();
        navigate(`${user.username}`)
      }}> {user?.username} </Text>
            <Image src='/verified.png' w={4} h={4} ml={1}/>
          </Flex>
          {/* //Rigt One */}
          <Flex gap={4} alignItems={"center"}>
            <Text fontSize={"xs"} w={36} textAlign={"right"} color={"gray.light"}>
          {formatDistanceToNow(new Date(post.createdAt))} ago
            </Text>
        {currentUser?._id === user._id && (
               <DeleteIcon  size={20} onClick={handleDeletePost}/>
        )}
            <Menu>
              <MenuButton>
     
            </MenuButton>
            <Portal>
        <MenuList bg={"gray.dark"}>
    <MenuItem bg={"gray.dark"}>Copy Link</MenuItem>
      </MenuList>
        </Portal>
            </Menu>
          </Flex>
      </Flex>
      <Text fontSize={"sm"}> {post.text} </Text>
      {post.image && 
      <Box
      borderRadius={6}
      overflow={"hidden"}
      border={"1px solid"}
      borderColor={"gray.light"}
      >
        <Image src={post.image} w={"full"} />
      </Box>
      }
      <Flex gap={3} my={1}>
         <Actions post={post} />
      </Flex>

   

    </Flex>
      </Flex>
    </Link>
  )
}

export default Post