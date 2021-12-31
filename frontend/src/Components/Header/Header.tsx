import logo from '../../assets/images/logo.svg';
import { Image } from '@chakra-ui/image';
import { StyledHeader } from './StyledHeader';
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  InputRightElement,
  Input,
  InputGroup,
  Popover,
  Box,
  PopoverTrigger,
  PopoverContent,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import USFlag from '../../assets/images/us.png';
import RUFlag from '../../assets/images/ru.png';
import { useState } from 'react';

function parsePathSegment(path: string) {
  return path
    .replace(/-/g, ' ')
    .replace(/^(\w)/g, (match, $1) => $1.toUpperCase());
}

export const Header = () => {
  const [selectLgPopoverOpen, setSelectLgPopoverOpen] = useState(false);
  const location = useLocation();
  const pathSegments = [
    // 'home',
    ...location.pathname.split('/').filter((el) => el),
  ];

  return (
    <StyledHeader>
      <Box minW={{ md: '20rem' }} m="pageMargin" mt="0">
        {/* Logo */}
        <Link to="/">
          <Image mx={['auto']} src={logo} boxSize="logoSize" />
        </Link>

        {/* Breadcrumbs */}
        {/* <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink
              fontSize="small"
              _focus={{}}
              _active={{}}
              as={Link}
              to={`/`}
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathSegments.map((segment) => (
            <BreadcrumbItem
              isCurrentPage={segment === pathSegments[pathSegments.length - 1]}
            >
              <BreadcrumbLink
                fontSize="small"
                _focus={{}}
                _active={{}}
                as={Link}
                to={`/${segment}`}
              >
                {parsePathSegment(segment)}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb> */}

        {/* Search */}
        <InputGroup mt={5}>
          <Input
            pl={2}
            className="special-border"
            variant="unstyled"
            placeholder="Search..."
          />
          <Popover
            placement="bottom-end"
            isOpen={selectLgPopoverOpen}
            closeOnBlur
            closeOnEsc
          >
            <PopoverTrigger>
              <InputRightElement
                onClick={() => setSelectLgPopoverOpen(true)}
                cursor="pointer"
                mr="2"
                width="25"
                height="25"
                children={<Image src={USFlag} width="1.4rem" />}
              />
            </PopoverTrigger>
            <PopoverContent
              onBlur={() => setSelectLgPopoverOpen(false)}
              _focus={{}}
              _active={{}}
              width="8rem"
              outline="none"
            >
              <Box
                px={3}
                py={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                _hover={{ background: '#dbdbdb' }}
                outline="none"
                cursor="pointer"
                onClick={() => setSelectLgPopoverOpen(false)}
              >
                English <Image src={USFlag} height="17px" />
              </Box>

              <Box
                py={1}
                px={3}
                cursor="pointer"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                _hover={{ background: '#dbdbdb' }}
                outline="none"
                onClick={() => setSelectLgPopoverOpen(false)}
              >
                Russian <Image height="17px" src={RUFlag} />
              </Box>
            </PopoverContent>
          </Popover>
        </InputGroup>
      </Box>
    </StyledHeader>
  );
};
