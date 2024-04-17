import { Box, Flex, Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import {Link} from 'react-router-dom'
import { Image,Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  useToast  } from '@chakra-ui/react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from './Actions'
import { useState } from 'react'

const UserPost = ({postImg,postTitle,likes,replies}) => {

  const [liked,setLiked] = useState(false)
  const toast = useToast()
  const copyUrl = () =>{
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(()=>{
      toast({
        description: "Post link copied",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    })
  }

  return (
    <Link>
      <Flex gap={3} mb={4} py={5}>
    <Flex flexDirection={"column"} alignItems={"center"}>
      <Avatar size="md" name="Mark Zuzckerberg" src="/zuck-avatar.png" />
      <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
      <Box position={"relative"} w={"full"}>
          <Avatar 
            size={"xs"}
            name='John doe'
            src='https://bit.ly/dan-abramov' 
            position={"absolute"}
            top={"0px"}
            left="15px"
            padding={"2px"}
          />
                <Avatar 
            size={"xs"}
            name='Prosper Otemuyiwa'
            src='https://bit.ly/prosper-baba'
            position={"absolute"}
            bottom={"0px"}
            right="-5px"
            padding={"2px"}
          />
                <Avatar 
            size={"xs"}
            name="Kent Dodds"
            src='https://bit.ly/kent-c-dodds'
            position={"absolute"}
            bottom={"0px"}
            left="4px"
            padding={"2px"}
          />
      </Box>
    </Flex>
    {/* POST RIGHT SIDE */}
    <Flex flex={1} flexDirection={"column"} gap={2}>
      <Flex justifyContent={"space-between"} w={"full"}> 
          {/* Left ONe */}
          <Flex w={"full"} alignItems={"center"}>
            <Text fontSize={"sm"} fontWeight={"bold"}>markzuckerberg</Text>
            <Image src='/verified.png' w={4} h={4} ml={1}/>
          </Flex>
          {/* //Rigt One */}
          <Flex gap={4} alignItems={"center"}>
            <Text fontStyle={"sm"} color={"gray.light"}>1d</Text>
            <Menu>
              <MenuButton>
            <BsThreeDots />
            </MenuButton>
            <Portal>
        <MenuList bg={"gray.dark"}>
    <MenuItem bg={"gray.dark"} onClick={copyUrl}>Copy Link</MenuItem>
      </MenuList>
        </Portal>
            </Menu>
          </Flex>
      </Flex>
      <Text fontSize={"sm"}> {postTitle} </Text>
      {postImg && 
      <Box
      borderRadius={6}
      overflow={"hidden"}
      border={"1px solid"}
      borderColor={"gray.light"}
      >
        <Image src={postImg} w={"full"} />
      </Box>
      }
      <Flex gap={3} my={1}>
         <Actions liked={liked} setLiked={setLiked}/>
      </Flex>

    <Flex gap={2} alignItems={"center"} >
      <Text color={"gray.light"} fontSize={"small"}> {replies}  replies</Text>
      <Box w={0.5} height={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
      <Text color={"gray.light"} fontSize={"small"}>{likes} likes</Text>
    </Flex>

    </Flex>
      </Flex>
    </Link>
  )
}

export default UserPost