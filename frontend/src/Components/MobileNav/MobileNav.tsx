import { Image } from '@chakra-ui/image';
import { Box, Container } from '@chakra-ui/layout';

import pencil from '../../assets/images/pencil-square.svg';
import fileText from '../../assets/images/file-text.svg';
import book from '../../assets/images/book.svg';
import journalArrowUp from '../../assets/images/journal-arrow-up.svg';
import bell from '../../assets/images/bell.svg';
import { Link } from 'react-router-dom';
import { useTheme } from '@chakra-ui/system';

export const MobileNav = () => {
  return (
    <Box
      display={{ base: 'flex', md: 'none' }}
      justifyContent="space-between"
      className="speacial-border"
      position="fixed"
      p={1}
      py={4}
      bottom="0"
      left="pageMargin"
      right={`pageMargin`}
      background="white"
    >
      <Link to="/add-sentence">
        <Image src={pencil} width="1.7rem" />
      </Link>
      <Image src={fileText} width="1.7rem" />
      <Image src={book} width="1.7rem" />
      <Image src={journalArrowUp} width="1.7rem" />
      <Image src={bell} width="1.7rem" />
    </Box>
  );
};
