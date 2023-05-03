import { useState } from 'react';
import { ButtonGroup, Text, Grid, GridItem, SlideFade, Box } from '@chakra-ui/react';
import { MainButton } from '../Buttons/MainButton';
import { ToggleButton } from '../Buttons/ToggleButton';
import './Header.css';

export const Header = () => {
  const [isAuthorized, setAuthorization] = useState(false);

  const dummyAuthorization = () => {
    isAuthorized ? setAuthorization(false) : setAuthorization(true);
  };

  return (
    <>
      <Box h="100px" bg="#695bd3" w="100%" minH="100px">
        <Text fontSize="6xl">GraphiQL by Musical Trio</Text>
      </Box>
      <Grid
        as="header"
        bg="black"
        h="100px"
        p="1rem"
        color="white"
        templateColumns="repeat(3, 1fr)"
        gap={5}
        className="header-container"
      >
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
                <Box minW="170px">
                  <MainButton label="Go to Main Page" source="#" handler={dummyAuthorization} />
                </Box>
              </SlideFade>
            )}
          </ButtonGroup>
        </GridItem>
      </Grid>
    </>
  );
};
