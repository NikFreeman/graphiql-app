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
import { LinkButton } from '../Buttons/LinkButton';
import { ToggleButton } from '../Buttons/ToggleButton';
import './Header.css';
import { useScrollPercentage } from '../../hooks/scrollPercentage';

export const Header = () => {
  const [isAuthorized, setAuthorization] = useState(false);
  //const [isHeaderSticky, setHeaderSticky] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSmallerThan800] = useMediaQuery('(max-width: 800px)');
  const [isSmallerThan600] = useMediaQuery('(max-width: 600px)');
  const { onToggle } = useDisclosure();

  const scrollPercentage = useScrollPercentage();

  const dummyAuthorization = () => {
    isAuthorized ? setAuthorization(false) : setAuthorization(true);
  };

  if (!isSmallerThan600 && isModalOpen) setModalOpen(false);

  return (
    <>
      <Flex h="100px" bg="#695bd3" w="100%" minH="100px" justify="center" align="center">
        <Text fontSize={isSmallerThan600 ? '2xl' : '6xl'}>GraphiQL by Musical Trio</Text>
      </Flex>
      <Flex flexDir="column" pos={'sticky'} top={'0'} zIndex={'2'}>
        <Grid
          as="header"
          bg="black"
          h={
            isSmallerThan800
              ? scrollPercentage > 37
                ? '115px'
                : '100px'
              : scrollPercentage > 47
              ? '115px'
              : '100px'
          }
          minH="100px"
          p="1rem"
          color="white"
          templateColumns={isSmallerThan600 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'}
          gap={5}
          className="header-container"
          transition="0.3s"
          style={{
            boxShadow: isSmallerThan800
              ? scrollPercentage > 37
                ? '0px -15px 24px -2px rgba(255, 255, 255, 0.35) inset'
                : '0px -15px 9px -6px rgba(255, 255, 255, 0) inset'
              : scrollPercentage > 47
              ? '0px -15px 24px -2px rgba(255, 255, 255, 0.35) inset'
              : '0px -15px 9px -6px rgba(255, 255, 255, 0) inset',
          }}
        >
          {!isSmallerThan600 && (
            <>
              <GridItem>
                <ButtonGroup variant="ghost">
                  <LinkButton label="GraphiQL" source="https://www.npmjs.com/package/graphiql" />
                </ButtonGroup>
              </GridItem>
              <GridItem>
                <Text fontSize="2xl" color="white">
                  Welcome!
                </Text>
              </GridItem>
              <GridItem>
                <ButtonGroup variant="ghost">
                  <ToggleButton label="ENG" hasBorder={false} />
                  {!isAuthorized && (
                    <SlideFade in={!isAuthorized}>
                      <ButtonGroup variant="ghost">
                        <ToggleButton
                          label="Sign In"
                          hasBorder={true}
                          handler={dummyAuthorization}
                        />
                        <ToggleButton label="Sign Up" hasBorder={true} />
                      </ButtonGroup>
                    </SlideFade>
                  )}
                  {isAuthorized && (
                    <SlideFade in={isAuthorized}>
                      <ButtonGroup variant="ghost">
                        <LinkButton label="Go to Main Page" source="#" />
                        <ToggleButton
                          label="Sign Out"
                          hasBorder={true}
                          handler={dummyAuthorization}
                        />
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
            <Flex
              pos={'absolute'}
              bg={'black'}
              w={'100%'}
              gap={'1rem'}
              p={'2rem'}
              flexDir={'column'}
            >
              <ToggleButton label="Selected Language: ENG" hasBorder={true} />
              {!isAuthorized && (
                <SlideFade in={!isAuthorized}>
                  <Flex flexDir={'column'} gap={'1rem'}>
                    <ToggleButton hasBorder={true} label="Sign In" handler={dummyAuthorization} />
                    <ToggleButton hasBorder={true} label="Sign Up" />
                  </Flex>
                </SlideFade>
              )}
              {isAuthorized && (
                <SlideFade in={isAuthorized}>
                  <Flex flexDir={'column'} gap={'1rem'}>
                    <LinkButton label="Go to Main Page" source="#" width="100%" />
                    <ToggleButton hasBorder={true} label="Sign Out" handler={dummyAuthorization} />
                  </Flex>
                </SlideFade>
              )}
            </Flex>
          </Collapse>
        )}
      </Flex>
    </>
  );
};
