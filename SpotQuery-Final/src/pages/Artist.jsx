import { Flex,  Spacer, Text, Box, Button, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TiArrowRightOutline, TiArrowLeftOutline } from "react-icons/ti";
import {base_url} from '../base_url';

export default function Artist() {

  const [artists, setArtists] = useState([]);
  const [previousPage, setPreviousPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    fetch(`${base_url}artists/showartist/?page=${currentPage}`)
      .then(response => response.json())
      .then(data => {
        setArtists(data.artists);
        setPreviousPage(data.links.previous);
        setNextPage(data.links.next);
      })
      .catch(error => console.error(error));
  }, [currentPage]);
  const handlePreviousPage = () => {
    setCurrentPage(previousPage);
  };
  const handleNextPage = () => {
    setCurrentPage(nextPage);
  };
  const uniqueArtists = [];

String(artists)
  .split(",")
  .map((value) => value.trim())
  .forEach((value) => {
    if (!uniqueArtists.includes(value)) {
      uniqueArtists.push(value);
    }
  });

  return (
    <>
     <Box w={'100%'}  mx='auto'>
  <Text fontSize="3xl" fontWeight="extrabold"  textAlign= "center" bgGradient="linear(to-r,  purple.300, green.500)" bgClip='text'  >Artists
  </Text>
  <Flex align="center" justify='center'>
    <Box fontWeight='semibold'
        letterSpacing='wide'
        textTransform='sentancecase'
        height='300px' width='150px' > 
        <ul>
        {uniqueArtists.map((value, index) => (
          <li key={index}>
            {value}
          </li>
        ))}</ul>  </Box>
     </Flex>    
    <Spacer /> 
    <Flex align="center" justify='center'>
    <Stack mt={4} direction='row' spacing={4} align='center'>
      <Button  disabled={!previousPage} onClick={handlePreviousPage} leftIcon={<TiArrowLeftOutline />} colorScheme='purple' variant='outline'>
        Previous
      </Button>
      <Button  disabled={!nextPage} onClick={handleNextPage} rightIcon={<TiArrowRightOutline />} colorScheme='purple' variant='outline'>
        Next
      </Button>
    </Stack>
    </Flex></Box>
    </> 
  )
}
