import { useForm } from 'react-hook-form';

import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useMediaQuery,
  useColorModeValue as colorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react';
import { ToggleButton } from '../components/Buttons/ToggleButton';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
  title: string;
  btnTitle: string;
  handleClick: (email: string, pass: string) => void;
}

interface FormInput {
  email: string;
  password: string;
}
function LoginForm(props: LoginFormProps) {
  const { t } = useTranslation();
  const [isSmallerThan600] = useMediaQuery('(max-width: 600px)');

  const {
    handleSubmit,
    register,
    // formState: { errors, isSubmitting },
  } = useForm<FormInput>();

  const handleClick = (data: FormInput) => {
    props.handleClick(data.email, data.password);
  };
  return (
    <form onSubmit={handleSubmit(handleClick)}>
      <Flex
        minH={'100%'}
        flexGrow={'1'}
        align={'center'}
        justify={'center'}
        bg={colorModeValue('gray.50', 'gray.500')}
      >
        <Stack
          spacing={8}
          mx={'auto'}
          maxW={'lg'}
          py={12}
          px={6}
          w={isSmallerThan600 ? '90%' : '500px'}
        >
          <Stack align={'center'}>
            <Text as="h2" fontSize={'6xl'}>
              {props.title}{' '}
            </Text>
            <Text fontSize={'lg'} color={'gray.600'}></Text>
          </Stack>
          <Flex
            bg={colorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            borderBottomRightRadius="0.5rem"
            borderBottomLeftRadius="0"
            borderTopLeftRadius="1rem"
            borderTopRightRadius="0"
          >
            <Stack spacing={4} w={'100%'}>
              <FormControl id="email" isRequired>
                <FormLabel>{t('email')}</FormLabel>
                <Input type="email" {...register('email', { required: 'This is required' })} />
                <FormErrorMessage>Email is required.</FormErrorMessage>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>{t('password')}</FormLabel>
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
          </Flex>
        </Stack>
      </Flex>
    </form>
  );
}
export default LoginForm;
