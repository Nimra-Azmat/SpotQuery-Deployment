// import { Container, Heading, Text, Box } from "@chakra-ui/react";
import React,{ useState, useEffect,useContext } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button, 
    Grid,
    Box, 
    Heading,
    Text, 
    Flex, 
    Container,
    useColorModeValue
} from "@chakra-ui/react";
import { TbReportSearch } from "react-icons/tb";
import AuthContext from "../context/AuthContext";
import {base_url} from '../base_url';

export default function Song() {
    let {bgcolor} =useColorModeValue('black.500','whiteAlpha.100')
    let {textColor} = useColorModeValue('gray.500','whiteAlpha.100')
  
    const [albumName, setAlbumName] = useState("");
    const [Song, setsong] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    let {authTokens}=useContext(AuthContext)
    // useEffect(()=>{
    //     handleSearch()
    //   },[])
    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${base_url}songs/showsong/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + String(authTokens.access),
                },
                body: JSON.stringify({ album: albumName }),
            });
            const data = await response.json();
            if (data.status === true) {
                handleSearch();
               }
            setsong(data);
            setIsLoading(false);
        } catch (err) {
            setError("Something went wrong. Please try again later.");
            setIsLoading(false);
        }
    };
    const Title = {
        fontSize: '20px',
        color:{textColor},
        fontWeight: "bold",
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
    
    <Flex direction="column" align="center" >
        <Heading color="#BBD6B8">Song</Heading> 
       <Container> 
        <Flex >
            <Box sx={boxStylesmain}>
                <FormControl id="albumName">
                    <FormLabel sx={Title}>Album Name</FormLabel>
                    <Input
                        type="text"
                        value={albumName}
                        onChange={(e) => setAlbumName(e.target.value)}
                    />
                </FormControl>
              
                    <Button
                       mt={4} onClick={handleSearch} isLoading={isLoading} leftIcon={<TbReportSearch />} colorScheme='pink' size='md' variant='solid'>
                        Search
                    </Button>
                   
                {Song.length > 0 && (
                    <Flex direction="column" mt="4">
                        <Text sx={Title}>Song</Text>
                        <Grid gridTemplateColumns="repeat(2, 1fr)" gridAutoFlow="row dense">
                            {Song.map((song) => (

                                <Flex key={song.id} direction="column" mb="4">

                                    <Flex>
                                        <Text sx={Text_Prop}>Album ID: </Text>
                                        <Text sx={Text_display}>{song.album_id}</Text>
                                    </Flex>
                                    <Flex>
                                        <Text sx={Text_Prop}>Song ID:</Text>
                                        <Text sx={Text_display}>{song.id_songs}</Text>
                                    </Flex>
                                    <Flex>
                                        <Text sx={Text_Prop}>Song Name: </Text>
                                        <Text sx={Text_display}>{song.name_song}</Text>
                                    </Flex>
                                    <Flex >
                                        <Text sx={Text_Prop}>Danceability: </Text>
                                        <Text sx={Text_display}>{song.danceability}</Text>
                                    </Flex>
                                    <Flex >
                                        <Text sx={Text_Prop}>Duration: </Text>
                                        <Text sx={Text_display}>{song.duration_ms}</Text>
                                    </Flex>
                                    <Flex >
                                        <Text sx={Text_Prop}>Release Date: </Text>
                                        <Text sx={Text_display}>{song.release_date}</Text>
                                    </Flex>

                                </Flex>


                            ))}
                        </Grid>
                    </Flex>

                )}
                {error && <Text color="red.500">{error}</Text>}
            </Box>

        </Flex>
        </Container>
        </Flex>
        </>
    );
}
