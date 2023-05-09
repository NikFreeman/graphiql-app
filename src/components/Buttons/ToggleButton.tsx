import { MouseEventHandler } from 'react';
import { Button } from '@chakra-ui/react';

interface ButtonProps {
  label: string;
  hasBorder?: boolean;
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
      h={'40px'}
      border={props.hasBorder ? 'solid 1px' : 'solid 1px transparent'}
    >
      {props.label}
    </Button>
  );
};
