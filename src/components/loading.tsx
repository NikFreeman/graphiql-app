import { CircularProgress, Center } from '@chakra-ui/react';

function Loading() {
  return (
    <Center h="100vh">
      <CircularProgress isIndeterminate color="#695bd3" />
    </Center>
  );
}
export default Loading;
