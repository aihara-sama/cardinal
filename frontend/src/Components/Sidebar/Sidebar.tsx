import { List, ListItem, Container, Image, Box } from '@chakra-ui/react';

import pencil from '../../assets/images/pencil-square.svg';
import fileText from '../../assets/images/file-text.svg';
import book from '../../assets/images/book.svg';
import journalArrowUp from '../../assets/images/journal-arrow-up.svg';
import bell from '../../assets/images/bell.svg';
import slider from '../../assets/images/sliders.svg';
import door from '../../assets/images/door-open.svg';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <Container mt={5} display={{ base: 'none', md: 'block' }}>
      <List>
        <ListItem transition=".2s" _hover={{ paddingLeft: '1rem' }}>
          <Box display="flex">
            <Image src={pencil} mr={2} w="0.9rem" />
            <Link to="/add-sentences">Add sentence</Link>
          </Box>
        </ListItem>
        <ListItem transition=".2s" _hover={{ paddingLeft: '1rem' }}>
          <Box display="flex">
            <Image src={fileText} mr={2} w="0.9rem" />
            <Link to="/my-sentences">My sentences</Link>
          </Box>
        </ListItem>
        <ListItem transition=".2s" _hover={{ paddingLeft: '1rem' }}>
          <Box display="flex">
            <Image src={book} mr={2} w="0.9rem" />
            <Link to="/disctionaries">Dictionaries</Link>
          </Box>
        </ListItem>
        <ListItem transition=".2s" _hover={{ paddingLeft: '1rem' }}>
          <Box display="flex">
            <Image src={journalArrowUp} mr={2} w="0.9rem" />
            <Link to="/grammar">Grammar</Link>
          </Box>
        </ListItem>
        <hr
          style={{
            borderColor: '#b3b3b3',
            marginTop: '.7rem',
            marginBottom: '.7rem',
          }}
        />
        <ListItem transition=".2s" _hover={{ paddingLeft: '1rem' }}>
          <Box display="flex">
            <Image src={bell} mr={2} w="0.9rem" />
            <Link to="/notifications">Notifications</Link>
          </Box>
        </ListItem>
        <ListItem transition=".2s" _hover={{ paddingLeft: '1rem' }}>
          <Box display="flex">
            <Image src={slider} mr={2} w="0.9rem" />
            <Link to="/preferences">Preferences</Link>
          </Box>
        </ListItem>
        <ListItem transition=".2s" _hover={{ paddingLeft: '1rem' }}>
          <Box display="flex">
            <Image src={door} mr={2} w="0.9rem" />
            <Link to="/logout">Logout</Link>
          </Box>
        </ListItem>
      </List>
    </Container>
  );
};
