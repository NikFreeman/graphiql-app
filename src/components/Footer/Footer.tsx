import {
  Flex,
  Box,
  Text,
  Link,
  Image,
  Grid,
  GridItem,
  Show,
  useMediaQuery,
} from '@chakra-ui/react';
import './Footer.css';

export const Footer = () => {
  const [isSmallerThan900] = useMediaQuery('(max-width: 900px)');
  return (
    <Flex
      as="footer"
      bg="black"
      h="100px"
      justifyContent={'space-around'}
      px={isSmallerThan900 ? '5vw' : '15vw'}
    >
      <Grid
        color="white"
        templateColumns="repeat(3, 1fr)"
        w={'100%'}
        gap={5}
        className="footer-container"
      >
        <GridItem justifySelf={'start'}>
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
        <GridItem justifySelf={'end'}>
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
    </Flex>
  );
};
