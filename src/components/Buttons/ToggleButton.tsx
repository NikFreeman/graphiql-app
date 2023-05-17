import { MouseEventHandler } from 'react';
import { Button } from '@chakra-ui/react';

interface ButtonProps {
  label: string;
  color?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  hasBorder?: boolean;
  handler?: MouseEventHandler;
}

export const ToggleButton = (props: ButtonProps) => {
  return (
    <Button
      colorScheme="blackAlpha"
      variant="ghost"
      color={props.color || 'white'}
      onClick={props.handler}
      type={props.type || 'button'}
      minW="80px"
      h={'40px'}
      borderColor={props.color || 'white'}
      border={props.hasBorder ? 'solid 1px' : 'solid 1px transparent'}
    >
      {props.label}
    </Button>
  );
};
