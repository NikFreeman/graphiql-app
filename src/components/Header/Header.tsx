import { useState } from 'react';
import {
  ButtonGroup,
  Text,
  Grid,
  GridItem,
  SlideFade,
  Flex,
  useMediaQuery,
  IconButton,
  Collapse,
  useDisclosure,
  Fade,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { LinkButton } from '../Buttons/LinkButton';
import { ToggleButton } from '../Buttons/ToggleButton';
import './Header.css';
import { useScrollPixels } from '../../hooks/scrollPixels';
import { ScrollTopButton } from '../../components/Buttons/ScrollTopButton';
import { useAuth } from '../../hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loading from '../loading';

export const Header = () => {
  const { isAuth, loading } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSmallerThan900] = useMediaQuery('(max-width: 900px)');
  const [isSmallerThan600] = useMediaQuery('(max-width: 600px)');
  const [isShorterThan500] = useMediaQuery('(max-height: 500px)');
  const { t, i18n } = useTranslation();
  const { onToggle } = useDisclosure();

  const headerHeight = 70;

  const location = useLocation();

  const scrollPixels = useScrollPixels();
  const navigate = useNavigate();
  const SignOut = () => {
    signOut(auth);
    navigate('/');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Fade in={scrollPixels > 300}>
        <ScrollTopButton />
      </Fade>
      <Flex h="60px" bg="#695bd3" w="100%" minH="60px" justify="center" align="center">
        <Text fontSize={isSmallerThan900 ? 'xl' : '4xl'}>{t('graphiqlBy')}</Text>
      </Flex>
      <Flex as="header" bg="black" flexDir="column" pos={'sticky'} top={'0'} zIndex={'2'}>
        <Grid
          h={
            scrollPixels > headerHeight && !isShorterThan500
              ? '90px'
              : scrollPixels <= headerHeight && !isShorterThan500
              ? '100px'
              : scrollPixels > headerHeight && isShorterThan500
              ? '75px'
              : '80px'
          }
          minH="75px"
          py="1rem"
          px={isSmallerThan900 ? '5vw' : '15vw'}
          color="white"
          templateColumns={'repeat(2, 1fr)'}
          gap={4}
          className="header-container"
          transition="0.3s"
          style={{
            boxShadow:
              scrollPixels > headerHeight
                ? '0px -15px 24px -2px rgba(255, 255, 255, 0.35) inset'
                : '0px -15px 9px -6px rgba(255, 255, 255, 0) inset',
          }}
        >
          {!isSmallerThan600 && (
            <>
              <GridItem justifySelf={'start'}>
                {location.pathname === '/' && (
                  <Text fontSize="2xl" color="white">
                    {t('welcome')}
                  </Text>
                )}
                {location.pathname !== '/' && (
                  <ButtonGroup variant="ghost">
                    <LinkButton label="GraphiQL" source="/" />
                  </ButtonGroup>
                )}
              </GridItem>
              <GridItem justifySelf={'end'}>
                <ButtonGroup variant="ghost">
                  <ToggleButton
                    label={t('lang')}
                    hasBorder={false}
                    handler={() => i18n.changeLanguage(t('lang') === 'ENG' ? 'ru' : 'en')}
                  />
                  {!isAuth && (
                    <SlideFade in={!isAuth}>
                      <ButtonGroup variant="ghost">
                        <LinkButton label={t('signIn')} source="/sign-in" />
                        <LinkButton label={t('signUp')} source="/sign-up" />
                      </ButtonGroup>
                    </SlideFade>
                  )}
                  {isAuth && (
                    <SlideFade in={isAuth}>
                      <ButtonGroup variant="ghost">
                        {location.pathname !== '/editor' && (
                          <LinkButton label={t('goToMain')} source="/editor" />
                        )}
                        <ToggleButton label={t('signOut')} hasBorder={true} handler={SignOut} />
                      </ButtonGroup>
                    </SlideFade>
                  )}
                </ButtonGroup>
              </GridItem>
            </>
          )}
          {isSmallerThan600 && (
            <>
              <GridItem justifySelf={'start'}>
                {location.pathname === '/' && (
                  <Text fontSize="2xl" color="white">
                    {t('welcome')}
                  </Text>
                )}
                {location.pathname !== '/' && (
                  <ButtonGroup variant="ghost">
                    <LinkButton label="GraphiQL" source="/" />
                  </ButtonGroup>
                )}
              </GridItem>
              <GridItem justifySelf={'end'}>
                <IconButton
                  aria-label="Open Menu"
                  border={'1px'}
                  borderColor={'white'}
                  minW={'80px'}
                  bg={'transparent'}
                  icon={isModalOpen ? <CloseIcon /> : <HamburgerIcon />}
                  onClick={() => {
                    setModalOpen(isModalOpen ? false : true);
                    onToggle;
                  }}
                />
              </GridItem>
            </>
          )}
        </Grid>
        {isSmallerThan600 && (
          <Collapse in={isModalOpen} animateOpacity>
            <Flex
              pos={'absolute'}
              bg={'black'}
              w={'100%'}
              gap={'1rem'}
              p={'2rem'}
              flexDir={'column'}
            >
              <ToggleButton
                label={t('selectedLang')}
                hasBorder={true}
                handler={() => i18n.changeLanguage(t('lang') === 'ENG' ? 'ru' : 'en')}
              />
              {!isAuth && (
                <SlideFade in={!isAuth}>
                  <Flex flexDir={'column'} gap={'1rem'}>
                    <LinkButton label={t('signIn')} source="/sign-in" width="100%" />
                    <LinkButton label={t('signUp')} source="/sign-up" width="100%" />
                  </Flex>
                </SlideFade>
              )}
              {isAuth && (
                <SlideFade in={isAuth}>
                  <Flex flexDir={'column'} gap={'1rem'}>
                    {location.pathname !== '/editor' && (
                      <LinkButton label={t('goToMain')} source="/editor" width="100%" />
                    )}
                    <ToggleButton hasBorder={true} label={t('signOut')} handler={SignOut} />
                  </Flex>
                </SlideFade>
              )}
            </Flex>
          </Collapse>
        )}
      </Flex>
    </>
  );
};
