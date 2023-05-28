import { Flex, Text, Image, useMediaQuery, Fade, Code } from '@chakra-ui/react';
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
  const [isSmallerThan470] = useMediaQuery('(max-width: 470px)');
  const { t } = useTranslation();

  const scrollPercentage = useScrollPercentage();

  return (
    <Flex
      data-testid="welcome-page"
      className="welcome-container"
      flexDirection="column"
      flexGrow="1"
      align="center"
    >
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
        <Text data-testid="developers" fontSize={isSmallerThan600 ? '4xl' : '6xl'}>
          {t('developers')}
        </Text>
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
              alt="NikFreeman Photo"
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
              alt="Rockmonolit Photo"
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
        <Fade in={scrollPercentage > 55}>
          <Flex flexDir={'column'} gap={'1rem'}>
            <Text fontSize={isSmallerThan600 ? '4xl' : '6xl'} color="white">
              {t('projectInfoTitle')}
            </Text>
            <Text fontSize="xl" align="justify" color="white">
              {t('projectInfo')}
            </Text>
            {!isSmallerThan470 && (
              <>
                <Text fontSize="xl" align="justify" color="white">
                  {t('trySnippet')}
                </Text>
                <Code
                  fontSize={isSmallerThan900 ? '14px' : '18px'}
                  textAlign={'initial'}
                  colorScheme="whiteAlpha"
                  display={'flex'}
                  justifySelf={'center'}
                  whiteSpace={'pre'}
                  p={'10px'}
                  justifyContent={'center'}
                  border={'solid'}
                  borderBottomRightRadius="0.5rem"
                  borderBottomLeftRadius="0"
                  borderTopLeftRadius="1rem"
                  borderTopRightRadius="0"
                  children="query go ($filter: FilterCharacter, $page: Int) {
  characters(filter: $filter, page: $page) {
    results {
      name
      status
    }
  }
}"
                />
                <Text fontSize="xl" align="justify" color="white">
                  {t('variablesExample')}
                </Text>

                <Code
                  fontSize={isSmallerThan900 ? '14px' : '18px'}
                  textAlign={'initial'}
                  colorScheme="whiteAlpha"
                  display={'flex'}
                  justifySelf={'center'}
                  whiteSpace={'pre'}
                  p={'10px'}
                  justifyContent={'center'}
                  border={'solid'}
                  borderBottomRightRadius="0.5rem"
                  borderBottomLeftRadius="0"
                  borderTopLeftRadius="1rem"
                  borderTopRightRadius="0"
                  children='{
  "filter": {
    "name": "Mr.",
    "status": "Alive"
  },
  "page": 1
}'
                />
              </>
            )}
          </Flex>
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
        <Fade in={scrollPercentage > 81}>
          <Text fontSize={isSmallerThan600 ? '4xl' : '6xl'}>{t('courseInfoTitle')}</Text>
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
