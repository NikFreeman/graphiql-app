import { MouseEventHandler } from 'react';
import { Link } from '@chakra-ui/react';

interface ButtonProps {
  label: string;
  source: string;
  width?: string;
  handler?: MouseEventHandler;
}

export const LinkButton = (props: ButtonProps) => {
  return (
    <Link
      href={props.source}
      color="white"
      w={props.width}
      minW="80px"
      h={'40px'}
      borderBottomRightRadius="0.5rem"
      borderBottomLeftRadius="0"
      borderTopLeftRadius="1rem"
      borderTopRightRadius="0"
      px={'16px'}
      alignSelf={'center'}
      border={'solid 1px'}
      opacity="0.9"
      pt={'7px'}
      minWidth={'max-content'}
      _hover={{ opacity: '1', borderColor: '#695bd3' }}
    >
      {props.label}
    </Link>
  );
};
