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
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const [isAuthorized, setAuthorization] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSmallerThan900] = useMediaQuery('(max-width: 900px)');
  const [isSmallerThan600] = useMediaQuery('(max-width: 600px)');
  const { t, i18n } = useTranslation();
  const { onToggle } = useDisclosure();

  const headerHeight = 150;

  const scrollPixels = useScrollPixels();

  const dummyAuthorization = () => {
    isAuthorized ? setAuthorization(false) : setAuthorization(true);
  };

  if (!isSmallerThan600 && isModalOpen) setModalOpen(false);

  return (
    <>
      <Fade in={scrollPixels > 300}>
        <ScrollTopButton />
      </Fade>
      <Flex h="100px" bg="#695bd3" w="100%" minH="100px" justify="center" align="center">
        <Text fontSize={isSmallerThan900 ? '2xl' : '6xl'}>{t('graphiqlBy')}</Text>
      </Flex>
      <Flex as="header" bg="black" flexDir="column" pos={'sticky'} top={'0'} zIndex={'2'}>
        <Grid
          h={scrollPixels > headerHeight ? '115px' : '100px'}
          minH="100px"
          py="1rem"
          px={isSmallerThan900 ? '5vw' : '15vw'}
          color="white"
          templateColumns={isSmallerThan600 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'}
          gap={5}
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
                <ButtonGroup variant="ghost">
                  <LinkButton label="GraphiQL" source="/" />
                </ButtonGroup>
              </GridItem>
              <GridItem>
                <Text fontSize="2xl" color="white">
                  {t('welcome')}
                </Text>
              </GridItem>
              <GridItem justifySelf={'end'}>
                <ButtonGroup variant="ghost">
                  <ToggleButton
                    label={t('lang')}
                    hasBorder={false}
                    handler={() => i18n.changeLanguage(t('lang') === 'ENG' ? 'ru' : 'en')}
                  />
                  {!isAuthorized && (
                    <SlideFade in={!isAuthorized}>
                      <ButtonGroup variant="ghost">
                        <LinkButton
                          label={t('signIn')}
                          source="/sign-in"
                          handler={dummyAuthorization}
                        />
                        <LinkButton
                          label={t('signUp')}
                          source="/sign-up"
                          handler={dummyAuthorization}
                        />
                      </ButtonGroup>
                    </SlideFade>
                  )}
                  {isAuthorized && (
                    <SlideFade in={isAuthorized}>
                      <ButtonGroup variant="ghost">
                        <LinkButton label="Go to Main Page" source="/" />
                        <ToggleButton
                          label={t('signOut')}
                          hasBorder={true}
                          handler={dummyAuthorization}
                        />
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
                <Text fontSize="2xl" color="white">
                  {t('welcome')}
                </Text>
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
              {!isAuthorized && (
                <SlideFade in={!isAuthorized}>
                  <Flex flexDir={'column'} gap={'1rem'}>
                    <LinkButton
                      label={t('signIn')}
                      source="/sign-in"
                      handler={dummyAuthorization}
                      width="100%"
                    />
                    <LinkButton
                      label={t('signUp')}
                      source="/sign-up"
                      handler={dummyAuthorization}
                      width="100%"
                    />
                  </Flex>
                </SlideFade>
              )}
              {isAuthorized && (
                <SlideFade in={isAuthorized}>
                  <Flex flexDir={'column'} gap={'1rem'}>
                    <LinkButton label={t('goToMain')} source="/" width="100%" />
                    <ToggleButton
                      hasBorder={true}
                      label={t('signOut')}
                      handler={dummyAuthorization}
                    />
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
