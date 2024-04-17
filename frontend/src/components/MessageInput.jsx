import {Flex,InputGroup,Spinner,Image,Input,InputRightElement,Modal,ModalBody,useDisclosure,ModalContent,ModalHeader,ModalOverlay,ModalCloseButton} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import {IoSendSharp} from 'react-icons/io5'
import useShowToast from '../hooks/useShowToast';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { conversationsAtom, selectedConversationAtom } from '../atoms/messagesAtom';
import { BsFillImageFill } from 'react-icons/bs';
import usePreviewImage from '../hooks/usePreviewImage';

const MessageInput = ({setMessages}) => {
  const [messageText,setMessageText] = useState('');
  const showToast = useShowToast()
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const setConversations = useSetRecoilState(conversationsAtom)
  const { onClose } = useDisclosure()
  const imageRef = useRef(null);
  const [isSending,setIsSending] = useState(false)

  const {imageUrl,handleImageChange,setImageUrl} = usePreviewImage()

  const handleSendMessage =async (e) =>{
    e.preventDefault();
    if(!messageText && !imageUrl) return;
    if(isSending) return;
    setIsSending(true)
    try {
      const res = await fetch("/api/messages",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          message:messageText,
          recipientId:selectedConversation.userId,
          image:imageUrl
        })
      })
      const data =  await res.json()
      if(data.error){
        showToast("Error",data.error,"error")
        return
      }
      setMessages((messages)=> [...messages, data]);
    
      setConversations(prevConvs =>{
      const updatedConversations = prevConvs.map(conversation => {
        if(conversation._id === selectedConversation._id){
          return {
            ...conversation,
            lastMessage:{
              text:messageText,
              sender:data.sender
            }
          }
        }
        return conversation
      })
      return updatedConversations;
      })
      setMessageText('')
      setImageUrl("")
    } catch (error) {
      showToast("Error",error.message,"error")
    }finally{
      setIsSending(false)
    }
  }

  return (
    <Flex gap={2} alignItems={"center"}>
    <form onSubmit={handleSendMessage} style={{flex:95}}>
      <InputGroup>
      <Input
      w={"full"}
      placeholder='Type a message...'
      value={messageText}
      onChange={(e)=>setMessageText(e.target.value)}
      />
      <InputRightElement onClick={handleSendMessage} cursor={"pointer"}>
      <IoSendSharp />
      </InputRightElement>
      </InputGroup>
    </form>
    <Flex flex={5} cursor={"pointer"}>
      <BsFillImageFill size={20} onClick={()=> imageRef.current.click()} />
      <Input type='file' hidden ref={imageRef} onChange={handleImageChange}/>
    </Flex>
    <Modal
    isOpen={imageUrl}
    onClose={()=>{
      onClose()
      setImageUrl('')
    }}
    >
    <ModalOverlay/>
    <ModalContent>
      <ModalHeader></ModalHeader>
      <ModalCloseButton />
      <ModalBody>
      <Flex mt={5} w={"full"}>
            <Image 
            src={imageUrl}
            alt='Message Image'
            borderRadius={4}
            />
          </Flex>
          <Flex justifyContent={"flex-end"} my={2}>
          {!isSending ? (
                    <IoSendSharp size={24} cursor={"pointer"} onClick={handleSendMessage}/>
          ): (
            <Spinner size="md"/>
          )}
          </Flex>
      </ModalBody>
    </ModalContent>
    </Modal>
    </Flex>
  )
}

export default MessageInput