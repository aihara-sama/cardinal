import { FormEvent, useState } from 'react';
import StyledRegister from './StyledRegister';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import {
  EMAIL_INVALID,
  EMAIL_REGEX,
  EMAIL_REQUIRED,
  PASSWORD_REQUIRED,
  PASSWORD_TOO_SHORT,
  USERNAME_REQUIRED,
} from '../../constants';
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

type Errors = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<Errors>({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = { ...errors };

    if (!EMAIL_REGEX.test(email)) {
      newErrors.email = EMAIL_INVALID;
    }
    if (password.length < 7) {
      newErrors.password = PASSWORD_TOO_SHORT;
    }

    if (!username) {
      newErrors.username = USERNAME_REQUIRED;
    }
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
      const { error, data } = await request('/auth/register', 'POST', {
        username,
        email,
        password,
      });
      if (error && error.statusCode === 400) {
        setErrors((prev) => ({ ...prev, ...error.messages }));
        return;
      }
      navigate('/auth/login');
    }
  };

  const onUsernameChange = (e: FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
    setErrors((prev) => ({ ...prev, username: '' }));
  };
  const onEmailChange = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    setErrors((prev) => ({ ...prev, email: '' }));
  };
  const onPasswordChange = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
    setErrors((prev) => ({ ...prev, password: '' }));
  };

  return (
    <StyledRegister>
      <Container centerContent>
        <Image src={logo} boxSize="logo" mt={5} />
        <Heading textAlign="center" fontSize="heading.primary" mt={10}>
          Create a new account
        </Heading>
        <Text mt="2" fontSize="small">
          Already a member? {` `}
          <Link as={RouterLink} to="/auth/login" color="blue.500">
            Login
          </Link>
        </Text>
        <Box mt="16" w="100%">
          <form method="post" onSubmit={onSubmit} noValidate>
            {/* Username field */}
            <FormControl w="100%" isInvalid={!!errors.username} isRequired>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                pl={2}
                onChange={onUsernameChange}
                id="username"
                className="special-border"
                variant="unstyled"
              />
              <FormErrorMessage>{errors.username}</FormErrorMessage>
            </FormControl>

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
            <FormControl mt="5" isInvalid={!!errors.password} isRequired>
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
              Create account
            </Button>
          </form>
        </Box>
      </Container>
    </StyledRegister>
  );
};

export default Register;
