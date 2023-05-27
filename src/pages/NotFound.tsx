import { Text, Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

function NotFound() {
  const { t } = useTranslation();
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
      <Text fontSize="3xl">{t('notFound')}</Text>
    </Flex>
  );
}
export default NotFound;
