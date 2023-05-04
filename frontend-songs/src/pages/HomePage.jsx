import { Flex, Heading, Text, Box, Button,useColorModeValue } from "@chakra-ui/react";
import { SlCursor } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function HomePage() {
  let {user,logoutUser}= useContext(AuthContext)
  let {bgcolor} =useColorModeValue('black.500','whiteAlpha.100')
  const boxStylesmain = {
    // p: "30px",
    bg: {bgcolor},
    m: "30px",
    textAlign: "center",
    shadow:"shadow hover:shadow-lg",
    borderWidth:'5px' , 
    minWidth:"700px",
    width:{ base: "100%", md: "auto" }
  };
  const boxStyles = {
    // p: "30px",
    bg: {bgcolor},
    m: "30px",
    textAlign: "center",
    shadow:"shadow hover:shadow-lg",
    // borderWidth:'5px' , 
    minWidth:"700px",
    width:{ base: "100%", md: "auto" }
  };
  const Text_prop = {
    fontSize: '20px',
    color:"purple.300",
    textAlign: "center"
  };
  return (
  <>
    <Flex direction="column" align="center" justify="center" height="50vh">
    <Box sx={boxStylesmain}>
      <Text sx={Text_prop}>
       {user && <Text> Hello! {user.username}</Text>}
      </Text>
      </Box>
      <Heading color="#BBD6B8">Dashboard</Heading>
      
      <Box sx={boxStyles} >
      {/* <Text >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus architecto perferendis nostrum optio, nihil hic sed deserunt in repudiandae illum.
      </Text>
      <Text fontWeight="bold">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi, eum.</Text>
       */}
      {user ? (
        <Button onClick={logoutUser} leftIcon={<SlCursor />} colorScheme='pink' size='md' variant='solid'>Logout</Button>
      ):(
        <Button as={Link} to="/Login" leftIcon={<SlCursor />} ccolorScheme='pink' size='md' variant='solid'>Login</Button>
        )} 
        </Box>
       
    </Flex >
  </ >
  )
}

