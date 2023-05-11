import { Text, Flex } from '@chakra-ui/react';
import { LinkButton } from '../components/Buttons/LinkButton';

function NotFound() {
  return (
    <Flex
      alignItems={'center'}
      flexDir={'column'}
      justify="center"
      align="center"
      flexGrow="1"
      gap={'1rem'}
    >
      <Text fontSize="6xl">404</Text>
      <Text fontSize="3xl">Not found</Text>
      <LinkButton label="Back to Main Page" source="/" color="black" />
    </Flex>
  );
}
export default NotFound;
