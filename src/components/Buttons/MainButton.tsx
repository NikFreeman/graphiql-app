import { MouseEventHandler } from 'react';
import { Button, Link } from '@chakra-ui/react';

interface ButtonProps {
  label: string;
  source: string;
  handler?: MouseEventHandler;
}

export const MainButton = (props: ButtonProps) => {
  return (
    <Link href={props.source} color="white">
      <Button colorScheme="blackAlpha" variant="outline" color="white" onClick={props.handler}>
        {props.label}
      </Button>
    </Link>
  );
};
