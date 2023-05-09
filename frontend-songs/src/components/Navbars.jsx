import React from 'react'
import { Flex, Heading, Box, Spacer, Button,VStack,StackDivider, ButtonGroup } from '@chakra-ui/react'
import { SlCursor, SlEarphones, SlMusicToneAlt, SlNotebook } from "react-icons/sl";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import ToggleColorMode from '../components/ToggleColorMode'

export default function Navbars() {
    return (
        <>
    <VStack
        divider={<StackDivider/>}
        spacing={4}
        align='stretch'>
        <ToggleColorMode />
    <Spacer/>
    <Flex minWidth='max-content' alignItems='center' gap='2'>
    <Box p='2' >
        <Heading 
            color="purple.300">
            SpotQuery
        </Heading>
        </Box>
        <Spacer />
     
        <ButtonGroup gap='2'>
            <Button as={Link} to="/" leftIcon={<RxDashboard />} colorScheme='purple' variant='ghost'>Dashboard</Button>
            <Button as={Link} to="/Artist" leftIcon={<SlEarphones />} colorScheme='purple' variant='ghost'>Artist</Button>
            <Button as={Link} to="/Album" leftIcon={<SlNotebook />} colorScheme='purple' variant='ghost'>Album</Button>
            <Button as={Link} to="/Song" leftIcon={<SlMusicToneAlt />} colorScheme='purple' variant='ghost'>Song</Button>
            <Button as={Link} to="/Login" leftIcon={<SlCursor />} colorScheme='purple' variant='ghost'>Login</Button>
        </ButtonGroup>
        </Flex>
    </VStack></>
)}