import { FormEvent, useState } from 'react';
import StyledLogin from './StyledLogin';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { EMAIL_REQUIRED, PASSWORD_REQUIRED } from '../../constants';
import { request } from '../../API/request';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { Box, Container, Heading, Link, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import logo from '../../assets/images/logo.svg';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { setUser } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';

type Errors = {
  email: string;
  password: string;
  bad_cred: string;
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<Errors>({
    email: '',
    password: '',
    bad_cred: '',
  });
  // const [badCredError, setBadCredError] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = { ...errors };

    if (!email) {
      newErrors.email = EMAIL_REQUIRED;
    }
    if (!password) {
      newErrors.password = PASSWORD_REQUIRED;
    }

    const isError = Object.values(newErrors).some((err) => err !== '');

    if (isError) {
      setErrors(newErrors);
    } else {
      const { error, data } = await request('/auth/login', 'POST', {
        email,
        password,
      });
      if (error && (error.statusCode === 400 || error.statusCode === 401)) {
        setErrors((prev) => ({ ...prev, ...error.messages }));
        return;
      }
      dispatch(setUser(data.user));
      navigate('/');
    }
  };

  const onEmailChange = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    setErrors((prev) => ({ ...prev, email: '', bad_cred: '' }));
  };
  const onPasswordChange = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
    setErrors((prev) => ({ ...prev, password: '', bad_cred: '' }));
  };

  return (
    <StyledLogin>
      <Container centerContent>
        <Image src={logo} boxSize="logo" mt={5} />
        <Heading textAlign="center" fontSize="heading.primary" mt={10}>
          Login
        </Heading>
        <Text mt="2" fontSize="small">
          Don't have an account yet? {` `}
          <Link as={RouterLink} to="/auth/register" color="blue.500">
            Register
          </Link>
        </Text>
        <Box mt="16" w="100%">
          <form method="post" onSubmit={onSubmit} noValidate>
            {/* Email field */}
            <FormControl mt="5" isInvalid={!!errors.email} isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                pl={2}
                onChange={onEmailChange}
                id="email"
                className="special-border"
                variant="unstyled"
                type="email"
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            {/* Password field */}
            <FormControl
              mt="5"
              isInvalid={!!errors.password || !!errors.bad_cred}
              isRequired
            >
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                pl={2}
                onChange={onPasswordChange}
                type="password"
                id="password"
                className="special-border"
                variant="unstyled"
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
              <FormErrorMessage>{errors.bad_cred}</FormErrorMessage>
            </FormControl>
            <Button
              mt="5"
              w="100%"
              bg="gray.500"
              color="light.primary"
              type="submit"
              _hover={{}}
              _active={{}}
              _focus={{}}
            >
              Login
            </Button>
          </form>
        </Box>
      </Container>
    </StyledLogin>
  );
};

export default Login;
