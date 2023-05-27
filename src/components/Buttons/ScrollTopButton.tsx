import { Button, useMediaQuery } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useScrollPercentage } from '../../hooks/scrollPercentage';

export const ScrollTopButton = () => {
  const scrollPercentage = useScrollPercentage();
  const [isSmallerThan900] = useMediaQuery('(max-width: 900px)');
  const [isShorterThan500] = useMediaQuery('(max-height: 500px)');

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
      bottom={scrollPercentage < 98 ? '1.75rem' : isShorterThan500 ? '75px' : '100px'}
      right={isSmallerThan900 ? '5vw' : '2rem'}
      opacity={'0.35'}
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
