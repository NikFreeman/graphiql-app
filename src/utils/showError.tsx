import { useToast } from '@chakra-ui/react';

interface ShowErrorProps {
  message: string;
}

function ShowError({ message }: ShowErrorProps) {
  const toast = useToast();
  return toast({
    description: message,
    position: 'top-right',
    status: 'error',
    isClosable: true,
    duration: 3000,
  });
}

export default ShowError;
