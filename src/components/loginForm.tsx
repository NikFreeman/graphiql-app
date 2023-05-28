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
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
  const [isShorterThan950] = useMediaQuery('(max-height: 950px)');

  const textBoxHeightShift = '-96px';

  const regExp = new RegExp('(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])[\\w!@#$%^&*]{8,}', 'gi');

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t('emailIsRequired') as string)
      .email(t('emailIsInvalid') as string),
    password: Yup.string()
      .required(t('passwordIsRequired') as string)
      .min(8, t('passwordMin') as string)
      .matches(regExp, t('passwordStrength') as string),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({ resolver: yupResolver(validationSchema) });

  const handleClick = (data: FormInput) => {
    props.handleClick(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(handleClick)} className="form">
      <Flex
        minH={'100%'}
        flexGrow={'1'}
        justify={'center'}
        bg={colorModeValue('gray.50', 'gray.500')}
      >
        <Stack
          spacing={isSmallerThan600 ? 4 : 8}
          mx={'auto'}
          maxW={'lg'}
          py={isShorterThan950 ? 6 : 12}
          px={6}
          w={isSmallerThan600 ? '90%' : '500px'}
          top={isShorterThan950 ? '0' : textBoxHeightShift}
          justifyContent={'center'}
          pos={'relative'}
        >
          <Stack align={'center'} data-testid="login-form">
            <Text as="h2" fontSize={isSmallerThan600 ? '4xl' : '6xl'}>
              {props.title}
            </Text>
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
              <FormControl id="email" isInvalid={!!errors.email}>
                <FormLabel>{t('email')}</FormLabel>
                <Input data-testid="email-input" type="email" id="email" {...register('email')} />
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={!!errors.password}>
                <FormLabel>{t('password')}</FormLabel>
                <Input data-testid="password-input" type="password" {...register('password')} />
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                ></Stack>
                <ToggleButton
                  color="black"
                  type="submit"
                  testid="submit"
                  isLoading={isSubmitting}
                  hasBorder={true}
                  label={props.btnTitle}
                />
              </Stack>
            </Stack>
          </Flex>
        </Stack>
      </Flex>
    </form>
  );
}
export default LoginForm;
