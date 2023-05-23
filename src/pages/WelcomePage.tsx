import { Flex, Text, Image, useMediaQuery, Fade } from '@chakra-ui/react';
import nickImg from '../assets/images/profile-nick.png';
import bonusImg from '../assets/images/profile-bonus.png';
import rockImg from '../assets/images/profile-rock.png';
import sloth from '../assets/images/rs-sloth.png';
import spinner from '../assets/images/spinner.gif';
import { useScrollPercentage } from '../hooks/scrollPercentage';
import { useTranslation } from 'react-i18next';

export const WelcomePage = () => {
  const [isSmallerThan900] = useMediaQuery('(max-width: 900px)');
  const [isSmallerThan700] = useMediaQuery('(max-width: 700px)');
  const [isSmallerThan600] = useMediaQuery('(max-width: 600px)');
  const { t } = useTranslation();

  const scrollPercentage = useScrollPercentage();

  return (
    <Flex className="welcome-container" flexDirection="column" flexGrow="1" align="center">
      <Flex
        as={'section'}
        bg="#695bd3"
        justify="center"
        align="center"
        flexDir="column"
        px={isSmallerThan900 ? '5vw' : '15vw'}
        py="5vh"
        gap="1rem"
      >
        <Text fontSize="6xl">{t('developers')}</Text>
        <Flex
          as={'article'}
          gap="3vw"
          p="1rem"
          border="2px"
          borderColor="black"
          borderBottomRightRadius="0.5rem"
          borderBottomLeftRadius="0"
          borderTopLeftRadius="1rem"
          borderTopRightRadius="0"
          bg="#ffffff1c"
        >
          {!isSmallerThan700 && (
            <Image
              src={nickImg}
              alt="Bonus156 Photo"
              w="250px"
              h="250px"
              alignSelf="center"
              rounded="md"
              boxShadow="sm"
              fallbackSrc={spinner}
              transition={'0.35s'}
              _hover={{ transform: 'rotate(-5deg) scale(1.06) translate(3px, -10px)' }}
            ></Image>
          )}
          <Flex flexDir="column" gap="1rem">
            <Text fontSize="4xl">NikFreeman</Text>
            <Text fontSize="xl" align="justify">
              {t('nickInfo')}
            </Text>
          </Flex>
        </Flex>
        <Flex as={'article'} gap="3vw" p="1rem">
          <Flex flexDir="column" gap="1rem">
            <Text fontSize="4xl">Bonus156</Text>
            <Text fontSize="xl" align="justify">
              {t('bonusInfo')}
            </Text>
          </Flex>
          {!isSmallerThan700 && (
            <Image
              src={bonusImg}
              alt="Bonus156 Photo"
              w="250px"
              h="250px"
              alignSelf="center"
              rounded="md"
              boxShadow="sm"
              fallbackSrc={spinner}
              transition={'0.35s'}
              _hover={{ transform: 'rotate(5deg) scale(1.06) translate(3px, -10px)' }}
            ></Image>
          )}
        </Flex>
        <Flex
          as={'article'}
          gap="3vw"
          p="1rem"
          border="2px"
          borderColor="black"
          borderBottomRightRadius="0.5rem"
          borderBottomLeftRadius="0"
          borderTopLeftRadius="1rem"
          borderTopRightRadius="0"
          bg="#ffffff1c"
        >
          {!isSmallerThan700 && (
            <Image
              src={rockImg}
              alt="Bonus156 Photo"
              w="250px"
              h="250px"
              alignSelf="center"
              rounded="md"
              boxShadow="sm"
              fallbackSrc={spinner}
              transition={'0.35s'}
              _hover={{ transform: 'rotate(-5deg) scale(1.06) translate(3px, -10px)' }}
            ></Image>
          )}
          <Flex flexDir="column" gap="1rem">
            <Text fontSize="4xl">Rockmonolit</Text>
            <Text fontSize="xl" align="justify">
              {t('rockInfo')}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        as={'section'}
        bg="black"
        w="100%"
        justify="center"
        align="center"
        flexDir="column"
        px={isSmallerThan600 ? '5vw' : '15vw'}
        py="5vh"
        gap="1rem"
      >
        <Fade in={scrollPercentage > 63}>
          <Text fontSize="6xl" color="white">
            {t('projectInfoTitle')}
          </Text>
          <Text fontSize="xl" align="justify" color="white">
            {t('projectInfo')}
          </Text>
        </Fade>
      </Flex>
      <Flex
        as={'section'}
        w="100%"
        justify="center"
        align="center"
        flexDir="column"
        px={isSmallerThan600 ? '5vw' : '15vw'}
        py="5vh"
        gap="1rem"
      >
        <Fade in={scrollPercentage > 83}>
          <Text fontSize="6xl">{t('courseInfoTitle')}</Text>
          <Text fontSize="xl" align="justify">
            {t('courseInfo')}
          </Text>
        </Fade>
        <Fade in={scrollPercentage > 97}>
          <Image src={sloth} alt="RS School Sloth" w="250px" h="auto" fallbackSrc={spinner}></Image>
        </Fade>
      </Flex>
    </Flex>
  );
};
