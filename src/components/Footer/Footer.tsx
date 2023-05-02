import { Flex, Box, Text, Link, Image, Grid, GridItem } from '@chakra-ui/react';
import './Footer.css';

export const Footer = () => {
  return (
    <Grid
      as="footer"
      bg="black"
      h="100px"
      p="1rem"
      color="white"
      templateColumns="repeat(3, 1fr)"
      gap={5}
      className="footer-container"
    >
      <GridItem>
        <Box w="10rem" className="footer-logo">
          <Link href="https://rs.school/react/">
            <Image
              style={{ filter: 'invert(1)' }}
              src="https://rs.school/images/rs_school_js.svg"
              alt="RS School Logo"
            />
          </Link>
        </Box>
      </GridItem>
      <GridItem>
        <Text fontSize="2xl" color="white">
          2023
        </Text>
      </GridItem>
      <GridItem>
        <Flex flexDirection="column">
          <Link color="white" href="https://github.com/NikFreeman">
            NikFreeman
          </Link>
          <Link color="white" href="https://github.com/Bonus156">
            Bonus156
          </Link>
          <Link color="white" href="https://github.com/rockmonolit">
            Rockmonolit
          </Link>
        </Flex>
      </GridItem>
    </Grid>
  );
};
