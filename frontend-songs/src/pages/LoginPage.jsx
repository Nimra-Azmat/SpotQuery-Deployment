import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoMdLogIn } from "react-icons/io";

const LoginPage = () => {
    let {bgcolor} =useColorModeValue('black.500','whiteAlpha.100')
    let {textColor} = useColorModeValue("black.500",'whiteAlpha.100')
    let {loginUser}=useContext(AuthContext)
    const Title = {
        fontSize: '20px',
        color:{textColor},
        fontWeight: "bold",
      };
        const boxStylesmain = {
          p: "30px",
          bg: {bgcolor},
          m: "30px",
          textAlign: "center",
          shadow:"shadow hover:shadow-lg",
          borderWidth:'5px' , 
          minWidth:"700px",
          width:{ base: "100%", md: "auto" }
        };
     
    return (
    <>
        <Flex direction="column" align="center" justify="center" height="50vh">
        <Heading  color="#BBD6B8" >Login</Heading>
        
        <Box sx={boxStylesmain}>
            <form onSubmit ={loginUser}>
            <FormControl id="username" isRequired>
        <FormLabel sx={Title}>Username</FormLabel>
                <Input type="text" name="username" placeholder="Enter Username" />
                </FormControl>
                <FormControl  id="password" isRequired>
        <FormLabel  sx={Title}>Password</FormLabel></FormControl>
                <Input type="password" name="password" placeholder="Enter Password" />
                
                    <Button mt={4} type="submit" leftIcon={<IoMdLogIn />} colorScheme='pink' size='md' variant='solid'>
                        Login
                </Button>
                
            </form>
            </Box>
        
        </Flex>
        </>
    )}

export default LoginPage
