import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const ScrollTopButton = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const { t } = useTranslation();
  return (
    <Button
      colorScheme="blackAlpha"
      variant="ghost"
      color="white"
      onClick={handleClick}
      minW="80px"
      h={'40px'}
      pos={'fixed'}
      bottom={'6rem'}
      right={'2rem'}
      opacity={'0.5'}
      border={'solid 1px'}
      transition={'0.3s'}
      bg={'#695bd3'}
      zIndex={'5'}
      _hover={{ opacity: '0.85' }}
    >
      {t('up')}
    </Button>
  );
};
