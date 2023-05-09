import { Flex, Box, Text, Link, Image, Grid, GridItem, Show } from '@chakra-ui/react';
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
        <Box w="10rem" className="footer-logo" mx="auto" opacity="0.9" _hover={{ opacity: '1' }}>
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
        <Show breakpoint="(min-width: 400px)">
          <Text fontSize="24px" color="white" opacity="0.9">
            2023
          </Text>
        </Show>
      </GridItem>
      <GridItem>
        <Flex flexDirection="column">
          <Link
            color="white"
            href="https://github.com/NikFreeman"
            opacity="0.9"
            _hover={{ opacity: '1' }}
          >
            NikFreeman
          </Link>
          <Link
            color="white"
            href="https://github.com/Bonus156"
            opacity="0.9"
            _hover={{ opacity: '1' }}
          >
            Bonus156
          </Link>
          <Link
            color="white"
            href="https://github.com/rockmonolit"
            opacity="0.9"
            _hover={{ opacity: '1' }}
          >
            Rockmonolit
          </Link>
        </Flex>
      </GridItem>
    </Grid>
  );
};
