import { Flex,  Heading, Text, Box, Button, Stack,useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TiArrowRightOutline, TiArrowLeftOutline } from "react-icons/ti";


export default function Artist() {
  let {bgcolor} =useColorModeValue('black.500','whiteAlpha.100')
  let {textColor} = useColorModeValue('gray.500','whiteAlpha.100')
  const [artists, setArtists] = useState([]);
  const [previousPage, setPreviousPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/artists/showartist/?page=${currentPage}`)
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
  const Text_prop = {
    fontSize: '20px',
    color :{textColor},
    textAlign: "center"
  };
  const boxStyles = {
    p: "3px",
    bg: {bgcolor},
    m: "3px",
    textAlign: "center",
    shadow:"shadow hover:shadow-lg",
    borderWidth:'5px' ,
  }
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
    <Flex direction="column" align="center" justify="center" height="50vh">
      <Heading color="#BBD6B8">Artists</Heading>
      
      <Box sx={boxStyles} >
        <Flex flexDirection="column">
      {uniqueArtists.map((value, index) => (
        <Box key={index}>
          <Text sx={Text_prop}>{value}</Text>
        </Box>
      ))}
    </Flex>
      </Box>
      <Flex alignItems="center" justifyContent="center">
        <Stack direction="row" align="center">
          <Button disabled={!previousPage} onClick={handlePreviousPage} leftIcon={<TiArrowLeftOutline />} colorScheme='purple' variant='ghost'>Previous</Button>
          <Button disabled={!nextPage} onClick={handleNextPage} rightIcon={<TiArrowRightOutline />} colorScheme='purple' variant='ghost'  >Next</Button>
        </Stack>
      </Flex>
    </Flex >
    </>
  )
}