import { MouseEventHandler } from 'react';
import { Button } from '@chakra-ui/react';

interface ButtonProps {
  label: string;
  handler?: MouseEventHandler;
}

export const ToggleButton = (props: ButtonProps) => {
  return (
    <Button
      colorScheme="blackAlpha"
      variant="ghost"
      color="white"
      onClick={props.handler}
      minW="80px"
    >
      {props.label}
    </Button>
  );
};
