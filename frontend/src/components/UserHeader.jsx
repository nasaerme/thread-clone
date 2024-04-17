import { Box, VStack, Flex, Text,Link} from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import {BsInstagram} from 'react-icons/bs'
import {CgMoreO} from 'react-icons/cg'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  useToast,
  Button
} from '@chakra-ui/react'
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import {Link as RouterLink} from 'react-router-dom'
import useFollowUnfollow from "../hooks/useFollowUnfollow";


const UserHeader = ({user}) => {
  const currentUser = useRecoilValue(userAtom) // this is the user logged in
  const toast = useToast()
 const {handleFollowUnfollow,following,updating} = useFollowUnfollow(user)

  const copyUrl = () =>{
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(()=>{
      toast({
        description: "Profile link copied",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    })
  }


  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{user.username}</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
         {user.profilePic ? (
           <Avatar name={user.name} src={user.profilePic} size={
            {
              base:"md",
              md:"xl"
            }
          } />
         ): (    <Avatar name={user.name} src="https://bit.ly/broken-link" size={
          {
            base:"md",
            md:"xl"
          }
        } />)}
        </Box>
      </Flex>

    <Text fontSize={"xs"}>
     {user.bio}
    </Text>

    {currentUser?._id === user._id && (
      <Link as={RouterLink} to="/update">
      <Button size={"sm"}>Update Profile</Button>
      </Link>
    )}


    {currentUser?._id !== user._id && (
      <Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>
        {following ? "Unfollow" : "Follow"}
      </Button>
    )}
    <Flex w={"full"} justifyContent={"space-between"}>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"}>{user.followers.length} followers</Text>
        <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
        <Link color={"gray.light"}>instagram.com</Link>
      </Flex>
      <Flex>
        <Box className="icon-container">
        <BsInstagram size={24} cursor={"pointer"}/>
        </Box>
        <Box className="icon-container">
          <Menu>
          <MenuButton>
        <CgMoreO size={24} cursor={"pointer"}/>
        </MenuButton>
        <Portal>
        <MenuList bg={"gray.dark"}>
    <MenuItem bg={"gray.dark"} onClick={copyUrl}>Copy Link</MenuItem>
      </MenuList>
        </Portal>
        </Menu>
        </Box>
      </Flex>
    </Flex>

    <Flex w={"full"}>
      <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb={3} cursor={"pointer"}>
        <Text fontWeight={"bold"}>Threads</Text>
      </Flex>
      <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} color={"gray.light"} pb={3} cursor={"pointer"}>
        <Text fontWeight={"bold"}>Replies</Text>
      </Flex>
    </Flex>

    </VStack>
  );
};

export default UserHeader;
