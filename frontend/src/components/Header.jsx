import {Flex, Image, Link, useColorMode} from '@chakra-ui/react'
import {useRecoilValue} from 'recoil'
import userAtom from '../atoms/userAtom'
import {AiFillHome} from 'react-icons/ai'
import {RxAvatar} from 'react-icons/rx'
import {MdOutlineSettings} from 'react-icons/md'
import {Link as RouterLink} from 'react-router-dom'
import {BsFillChatQuoteFill} from 'react-icons/bs'

const Header = () => {

  const {colorMode, toggleColorMode} =  useColorMode()
  const currentUser = useRecoilValue(userAtom)
 
  return (
    <Flex justifyContent={"space-between"} mt={6} mb={12}>

        {currentUser && (
          <Link as={RouterLink} to={"/"}>
            <AiFillHome size={24}/>
          </Link>
        )}

        <Image 
        cursor="pointer"
        alt='logo'
        w={6}
        src={colorMode === 'dark' ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
        />

          {currentUser && (
          <Flex alignItems={"center"} gap={4}>
          <Link as={RouterLink} to={`/${currentUser.username}`}>
            <RxAvatar size={24}/>
          </Link>
          <Link as={RouterLink} to={`/chat`}>
            <BsFillChatQuoteFill size={20}/>
          </Link>
          <Link as={RouterLink} to={`/settings`}>
            <MdOutlineSettings size={20}/>
          </Link>
          </Flex>
        )}
    </Flex>
  )
}

export default Header