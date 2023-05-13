import { useState } from 'react';
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
} from '@chakra-ui/react';
import { ToggleButton } from '../components/Buttons/ToggleButton';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
  title: string;
  btnTitle: string;
  handleClick: (email: string, pass: string) => void;
}

function LoginForm(props: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { t } = useTranslation();

  return (
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
            <FormControl id="email">
              <FormLabel>{t('email')}</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>{t('password')}</FormLabel>
              <Input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              ></Stack>
              <ToggleButton
                color="black"
                hasBorder={true}
                label={props.btnTitle}
                handler={() => props.handleClick(email, pass)}
              />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
export default LoginForm;
