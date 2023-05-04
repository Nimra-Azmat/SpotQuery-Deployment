import React from 'react'
import { Text } from "@chakra-ui/react";

const NotFound = () => {
    const Text_prop = {
        fontSize: '20px',
        color: 'tomato',
        textAlign: "center",
        fontWeight: "bold"
      };
  return (
    <>
    <Text sx={Text_prop}>
      This URL Doesnot Exists
    </Text>
    </>
  )
}

export default NotFound