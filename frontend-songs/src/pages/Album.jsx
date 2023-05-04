import React,{ useState, useContext,useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box, 
  Heading,
  Text, 
  Flex, 
  useColorModeValue,
} from "@chakra-ui/react";
import { TbMoodSearch } from "react-icons/tb";
import AuthContext from "../context/AuthContext";


export default function Album() {
  let {bgcolor} =useColorModeValue('black.500','whiteAlpha.100')
  let {textColor} = useColorModeValue('gray.500','whiteAlpha.100')

  let {authTokens}=useContext(AuthContext)
  const [artistName, setArtistName] = useState("");
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // useEffect(()=>{
  //   handleSearch()
  // },[])

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/albums/showalbums/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify({ artists: artistName }),
      });
      const data = await response.json();
      // if (data.status === true) {
      //  handleSearch();
      // }
      setAlbums(data);
      setIsLoading(false);
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      setIsLoading(false);
    }
  };
  const Text_Prop = {
    fontSize: '15px',
    textAlign: 'center',
    color: 'purple.300',
    mr: '2',
    fontWeight: "bold",
  };
  const Text_display = {
    fontSize: '15px',
    textAlign: 'center',
  };
  const Title = {
    fontSize: '20px',
    color:{textColor},
    fontWeight: "bold",
  };
    const boxStyles = {
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
      <Heading color="#BBD6B8">Album</Heading>
      
      <Box sx={boxStyles}>
        <FormControl id="artistName">
          <FormLabel sx={Title}>Artist Name</FormLabel>
          <Input
            type="text"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
        </FormControl>
        
          <Button
           mt={4} onClick={handleSearch} isLoading={isLoading}  leftIcon={<TbMoodSearch />} colorScheme='pink' size='md' variant='solid'>
            Search
          </Button>
      
        {albums.length > 0 && (
          <Flex direction="column" mt="4">
            <Text sx={Title}>Albums</Text>
            {albums.map((album) => (
              <li key={album.id} direction="column" mb="4">
                <Flex align="center">
                  <Text sx={Text_Prop}>Artist ID:</Text>
                  <Text sx={Text_display}>{album.artist_ids}</Text>
                </Flex>
                <Flex align="center">
                  <Text sx={Text_Prop}>Album ID: </Text>
                  <Text sx={Text_display}>{album.album_id}</Text>
                </Flex>
                <Flex align="center">
                  <Text sx={Text_Prop}>Album: </Text>
                  <Text sx={Text_display}>{album.album}</Text>
                </Flex>
              </li>
            ))}
           
          </Flex>

        )}
        {error && <Text color="red.500">{error}</Text>}
      </Box> 
    </Flex>
    </>
  );
}
