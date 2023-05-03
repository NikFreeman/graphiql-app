import { Flex, Text } from '@chakra-ui/react';
export const WelcomePage = () => {
  return (
    <Flex
      className="welcome-container"
      flexDirection="column"
      w="100vw"
      flexGrow="1"
      align="center"
    >
      <Flex
        bg="#695bd3"
        w="100%"
        justify="center"
        align="center"
        flexDir="column"
        px="15vw"
        py="5vh"
        gap="1rem"
      >
        <Text fontSize="6xl">Developers</Text>
        <Text fontSize="xl" align="justify">
          NikFreeman is a talented programmer who is passionate about creating innovative and
          efficient software solutions. With a keen eye for detail and a deep understanding of
          programming languages and frameworks, Nik brings a valuable skillset to any project. As a
          core member of the GraphiQL app development team, Nik is constantly working to ensure that
          the app is both user-friendly and high-performing.
        </Text>
        <Text fontSize="xl" align="justify">
          Bonus156 is a skilled developer with extensive experience in building complex web
          applications. With a creative approach to problem-solving and a dedication to producing
          high-quality code, Bonus is a valuable asset to any development team. As a key member of
          the GraphiQL app development team, Bonus is involved in all aspects of the project, from
          architecture design to feature implementation.
        </Text>
        <Text fontSize="xl" align="justify">
          Rockmonolit is a seasoned programmer with an impressive track record of delivering
          successful software projects. With a strong background in web development and a passion
          for designing intuitive user interfaces, Rockmonolit is a valuable addition to any
          development team. As an integral part of the GraphiQL app development team, Rockmonolit is
          working to create a powerful and user-friendly tool that will revolutionize the way
          developers interact with APIs.
        </Text>
      </Flex>
      <Flex
        bg="black"
        w="100%"
        justify="center"
        align="center"
        flexDir="column"
        px="15vw"
        py="5vh"
        gap="1rem"
      >
        <Text fontSize="6xl" color="white">
          Information about the project
        </Text>
        <Text fontSize="xl" align="justify" color="white">
          GraphiQL is an integrated development environment (IDE) that is primarily used for
          querying APIs that are built using GraphQL. It is built using the React JavaScript library
          and allows developers to interactively explore and test their GraphQL APIs by writing and
          executing queries, viewing query results, and analyzing the underlying schema. GraphiQL
          for React provides a range of features designed to simplify the process of working with
          GraphQL APIs, making it an indispensable tool for developers building GraphQL-based
          applications.
        </Text>
      </Flex>
      <Flex w="100%" justify="center" align="center" flexDir="column" px="15vw" py="5vh" gap="1rem">
        <Text fontSize="6xl">Information about the course</Text>
        <Text fontSize="xl" align="justify">
          The Rolling Scopes School offers a comprehensive course on React, covering topics such as
          JSX, class and functional components, virtual DOM, React hooks, Redux, and more. The
          course provides a strong foundation in React and web development, with hands-on projects
          and real-world scenarios designed to help students build practical skills. With
          experienced instructors and a supportive community, the Rolling Scopes React course is an
          excellent starting point for anyone looking to learn this popular JavaScript library.
        </Text>
      </Flex>
    </Flex>
  );
};
