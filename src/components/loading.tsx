import { CircularProgress, Center } from '@chakra-ui/react';

function Loading() {
  return (
    <Center h="100vh">
      <CircularProgress isIndeterminate color="green.300" />
    </Center>
  );
}
export default Loading;
