import { ButtonGroup, Text, Grid, GridItem } from '@chakra-ui/react';
import { MainButton } from '../Buttons/MainButton';
import { ToggleButton } from '../Buttons/ToggleButton';
import './Header.css';

export const Header = () => {
  return (
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
        <ToggleButton label="ENG" />
        <ButtonGroup variant="ghost">
          <MainButton label="Sign In" source="#" />
          <MainButton label="Sign Up" source="#" />
        </ButtonGroup>
      </GridItem>
    </Grid>
  );
};
