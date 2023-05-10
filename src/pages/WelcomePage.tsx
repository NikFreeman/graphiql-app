import { Flex, Text, Image, useMediaQuery, Fade } from '@chakra-ui/react';
import nickImg from '../assets/images/profile-nick.png';
import bonusImg from '../assets/images/profile-bonus.png';
import rockImg from '../assets/images/profile-rock.png';
import sloth from '../assets/images/rs-sloth.png';
import spinner from '../assets/images/spinner.gif';
import { useScrollPercentage } from '../hooks/scrollPercentage';

export const WelcomePage = () => {
  const [isSmallerThan900] = useMediaQuery('(max-width: 900px)');
  const [isSmallerThan700] = useMediaQuery('(max-width: 700px)');
  const [isSmallerThan600] = useMediaQuery('(max-width: 600px)');

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
        <Text fontSize="6xl">Developers</Text>
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
              NikFreeman is a talented programmer who is passionate about creating innovative and
              efficient software solutions. With a keen eye for detail and a deep understanding of
              programming languages and frameworks, Nik brings a valuable skillset to any project.
              As a core member of the GraphiQL app development team, Nik is constantly working to
              ensure that the app is both user-friendly and high-performing.
            </Text>
          </Flex>
        </Flex>
        <Flex as={'article'} gap="3vw" p="1rem" >
          <Flex flexDir="column" gap="1rem">
            <Text fontSize="4xl">Bonus156</Text>
            <Text fontSize="xl" align="justify">
              Bonus156 is a skilled developer with extensive experience in building complex web
              applications. With a creative approach to problem-solving and a dedication to
              producing high-quality code, Bonus is a valuable asset to any development team. As a
              key member of the GraphiQL app development team, Bonus is involved in all aspects of
              the project, from architecture design to feature implementation.
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
              Rockmonolit is a seasoned programmer with an impressive track record of delivering
              successful software projects. With a strong background in web development and a
              passion for designing intuitive user interfaces, Rockmonolit is a valuable addition to
              any development team. As an integral part of the GraphiQL app development team,
              Rockmonolit is working to create a powerful and user-friendly tool that will
              revolutionize the way developers interact with APIs.
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
        <Fade in={scrollPercentage > 66}>
          <Text fontSize="6xl" color="white">
            Information about the project
          </Text>
          <Text fontSize="xl" align="justify" color="white">
            GraphiQL is an integrated development environment (IDE) that is primarily used for
            querying APIs that are built using GraphQL. It is built using the React JavaScript
            library and allows developers to interactively explore and test their GraphQL APIs by
            writing and executing queries, viewing query results, and analyzing the underlying
            schema. GraphiQL for React provides a range of features designed to simplify the process
            of working with GraphQL APIs, making it an indispensable tool for developers building
            GraphQL-based applications.
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
          <Text fontSize="6xl">Information about the course</Text>
          <Text fontSize="xl" align="justify">
            The Rolling Scopes School offers a comprehensive course on React, covering topics such
            as JSX, class and functional components, virtual DOM, React hooks, Redux, and more. The
            course provides a strong foundation in React and web development, with hands-on projects
            and real-world scenarios designed to help students build practical skills. With
            experienced instructors and a supportive community, the Rolling Scopes React course is
            an excellent starting point for anyone looking to learn this popular JavaScript library.
          </Text>
        </Fade>
        <Fade in={scrollPercentage > 97}>
          <Image src={sloth} alt="RS School Sloth" w="250px" h="auto" fallbackSrc={spinner}></Image>
        </Fade>
      </Flex>
    </Flex>
  );
};
