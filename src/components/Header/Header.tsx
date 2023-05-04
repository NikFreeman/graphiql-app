import { useState } from 'react';
import {
  ButtonGroup,
  Text,
  Grid,
  GridItem,
  SlideFade,
  Flex,
  useMediaQuery,
  IconButton,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { MainButton } from '../Buttons/MainButton';
import { ToggleButton } from '../Buttons/ToggleButton';
import './Header.css';

export const Header = () => {
  const [isAuthorized, setAuthorization] = useState(false);
  const [isHeaderSticky, setHeaderSticky] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const [isSmallerThan600] = useMediaQuery('(max-width: 600px)');
  const { onToggle } = useDisclosure();

  const dummyAuthorization = () => {
    isAuthorized ? setAuthorization(false) : setAuthorization(true);
    setHeaderSticky(isAuthorized ? true : false);
  };

  return (
    <>
      <Flex h="100px" bg="#695bd3" w="100%" minH="100px" justify="center" align="center">
        <Text fontSize={isSmallerThan600 ? '2xl' : '6xl'}>GraphiQL by Musical Trio</Text>
      </Flex>
      <Flex flexDir="column" pos={'sticky'} top={'0'}>
        <Grid
          as="header"
          bg="black"
          h="100px"
          minH="100px"
          p="1rem"
          color="white"
          templateColumns={isSmallerThan600 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'}
          gap={5}
          className="header-container"
          transition="0.3s"
          style={{ backgroundColor: isHeaderSticky ? 'black' : '#322d59' }}
        >
          {!isSmallerThan600 && (
            <>
              <GridItem>
                <MainButton label="GraphiQL" source="#" />
              </GridItem>
              <GridItem>
                <Text fontSize="2xl" color="white">
                  Welcome!
                </Text>
              </GridItem>
              <GridItem>
                <ButtonGroup variant="ghost">
                  <ToggleButton label="ENG" />
                  {!isAuthorized && (
                    <SlideFade in={!isAuthorized}>
                      <ButtonGroup variant="ghost">
                        <MainButton label="Sign In" source="#" handler={dummyAuthorization} />
                        <MainButton label="Sign Up" source="#" />
                      </ButtonGroup>
                    </SlideFade>
                  )}
                  {isAuthorized && (
                    <SlideFade in={isAuthorized}>
                      <ButtonGroup variant="ghost">
                        <MainButton label="Go to Main Page" source="#" />
                        <MainButton label="Sign Out" source="#" handler={dummyAuthorization} />
                      </ButtonGroup>
                    </SlideFade>
                  )}
                </ButtonGroup>
              </GridItem>
            </>
          )}
          {isSmallerThan600 && (
            <>
              <GridItem justifySelf={'start'}>
                <Text fontSize="2xl" color="white">
                  Welcome!
                </Text>
              </GridItem>
              <GridItem justifySelf={'end'}>
                <IconButton
                  aria-label="Open Menu"
                  border={'1px'}
                  borderColor={'white'}
                  minW={'80px'}
                  bg={'transparent'}
                  icon={isModalOpen ? <CloseIcon /> : <HamburgerIcon />}
                  onClick={() => {
                    setModalOpen(isModalOpen ? false : true);
                    onToggle;
                  }}
                />
              </GridItem>
            </>
          )}
        </Grid>
        {isSmallerThan600 && (
          <Collapse in={isModalOpen} animateOpacity>
            <Flex pos={'absolute'} bg={'black'} w={'100%'}>
              <Text fontSize="6xl" color="white">
                Burger!
              </Text>
            </Flex>
          </Collapse>
        )}
      </Flex>
    </>
  );
};
