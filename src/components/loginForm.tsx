import { useForm } from 'react-hook-form';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  useColorModeValue as colorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react';
import { ToggleButton } from '../components/Buttons/ToggleButton';

interface LoginFormProps {
  title: string;
  btnTitle: string;
  handleClick: (email: string, pass: string) => void;
}
interface IFormInput {
  email: string;
  password: string;
}

function LoginForm(props: LoginFormProps) {
  const {
    handleSubmit,
    register,
    // formState: { errors, isSubmitting },
  } = useForm<IFormInput>();
  const handleClick = (data: IFormInput) => {
    console.log('data=>', data);
    props.handleClick(data.email, data.password);
  };
  return (
    <form onSubmit={handleSubmit(handleClick)}>
      <Flex
        minH={'100%'}
        flexGrow={'1'}
        align={'center'}
        justify={'center'}
        bg={colorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>{props.title} </Heading>
            <Text fontSize={'lg'} color={'gray.600'}></Text>
          </Stack>
          <Box rounded={'lg'} bg={colorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" {...register('email', { required: 'This is required' })} />
                <FormErrorMessage>Email is required.</FormErrorMessage>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  {...register('password', { required: 'This is required' })}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                ></Stack>
                <ToggleButton color="black" type="submit" hasBorder={true} label={props.btnTitle} />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}
export default LoginForm;
