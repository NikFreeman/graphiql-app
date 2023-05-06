import { MouseEventHandler } from 'react';
import { Button, Link } from '@chakra-ui/react';

interface ButtonProps {
  label: string;
  source: string;
  width?: string;
  handler?: MouseEventHandler;
}

export const LinkButton = (props: ButtonProps) => {
  return (
    <Link href={props.source} color="white">
      <Button
        colorScheme="blackAlpha"
        variant="outline"
        color="white"
        onClick={props.handler}
        w={props.width}
      >
        {props.label}
      </Button>
    </Link>
  );
};
