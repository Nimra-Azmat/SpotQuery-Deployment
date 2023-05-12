import React,{ useState, useContext } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text, 
  Flex,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { TbReportSearch } from "react-icons/tb";
import AuthContext from "../context/AuthContext";
import {base_url} from '../base_url';
import { useMediaQuery } from '@chakra-ui/media-query';

export default function Album() {
 
  let {authTokens}=useContext(AuthContext)

  const [artistName, setArtistName] = useState("");
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${base_url}albums/showalbums/`, {
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
  const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");

  return (
  <>
   <Flex direction={isNotSmallerScreen ? "row" : "column"}
        spacing="100px" p={isNotSmallerScreen ? "10" : "0"}
        alignSelf="flex-start">
    
    <Box w={'100%'}  mx='auto'>
      <Heading fontSize="3xl" fontWeight="bold"  textAlign= "center" bgGradient="linear(to-r,  purple.300, green.500)" bgClip='text'  >Album</Heading>
      <FormControl id="artistName">
          <FormLabel fontWeight="extrabold" bgGradient="linear(to-r,  purple.300, green.500)" bgClip='text'>Artist Name</FormLabel>
          <Input
            type="text"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
        </FormControl>
        <Flex align="center" justify='center'>
          <Button  mt={4} onClick={handleSearch} isLoading={isLoading} leftIcon={<TbReportSearch />} colorScheme='purple' variant='outline'>
            Search
          </Button></Flex>
      {/* Table */}
                <Table variant='simple'>
                    <Thead>
                    <Tr>
                        <Th>Artist ID</Th>
                        <Th>Album ID</Th>
                        <Th>Album</Th>
                    </Tr>
                    </Thead> 
            <Tbody>
              {albums?.map((album) => (
                  <Tr key={album.id} >
                      <Td>{album.artist_ids}</Td>
                      <Td>{album.album_id}</Td>
                      <Td>{album.album}</Td>
                     </Tr> 
              ))}
            </Tbody>
                </Table>
        {error && <Text color="red.500">{error}</Text>}
    </Box>
    </Flex>
    </>
  );
}

