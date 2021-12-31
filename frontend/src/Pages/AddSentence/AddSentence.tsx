import { useNavigate } from 'react-router-dom';
import { StyledAddSentence } from './StyledAddSentence';
import { Header } from '../../Components/Header/Header';
import { Box, Container, Heading, Text } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';
import pencil from '../../assets/images/pencil-square.svg';
import fileText from '../../assets/images/file-text.svg';
import book from '../../assets/images/book.svg';
import journalArrowUp from '../../assets/images/journal-arrow-up.svg';
import bell from '../../assets/images/bell.svg';

import { Image } from '@chakra-ui/image';
import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { Button } from '@chakra-ui/button';
import { Sidebar } from '../../Components/Sidebar/Sidebar';
import { request } from '../../API/request';
import { MobileNav } from '../../Components/MobileNav/MobileNav';

export const AddSentence = () => {
  const [autoTranslateActive, setAutoTranslateActive] = useState(false);
  const [sentenceRu, setSentenceRu] = useState('');
  const [sentenceEn, setSentenceEn] = useState('');
  const [sentenceRuError, setSentenceRuError] = useState('');
  const [sentenceEnError, setSentenceEnError] = useState('');
  const [tags, setTags] = useState<{ id: number; tag: string }[]>([]);
  const [selectedTagsIds, setSelectedTagsIds] = useState<number[]>([]);
  const navigate = useNavigate();
  // const [isAutoTranslateOn, setIsAutoTranslateOn] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (sentenceEn && sentenceRu) {
      const { error, data } = await request('/sentences', 'POST', {
        ru: sentenceRu,
        en: sentenceEn,
        tagIds: selectedTagsIds,
      });
      if (error) return console.error({ error });
      return navigate('/home');
    }

    if (!sentenceEn) {
      setSentenceEnError('This field is required');
    }
    if (!sentenceRu) {
      setSentenceRuError('This field is required');
    }
  };

  useEffect(() => {
    (async () => {
      const { error, data } = await request('/tags');
      if (error) return console.error({ error }); // TO DO: handle error
      setTags(data);
    })();
  }, []);
  return (
    <StyledAddSentence>
      <Box display={{ md: 'flex' }}>
        <Box>
          <Header />
          {/* Right sidebar for desktop only */}
          <Sidebar />
          {/* Main side for desktop */}
        </Box>

        <Box
          flexBasis="100%"
          m="pageMargin"
          minW={{ md: 0 }}
          maxW={{ md: 'none' }}
        >
          <Box display="flex" justifyContent="space-between">
            <Heading fontSize="1.5rem" fontWeight="400">
              Add sentence
            </Heading>
            <Image src={bell} display={{ base: 'none', md: 'block' }} />
          </Box>
          <hr
            style={{
              borderColor: '#b3b3b3',
              marginTop: '.7rem',
              marginBottom: '.7rem',
            }}
          />

          {/* Add sentence form */}
          <form onSubmit={onSubmit}>
            <Box mt={5}>
              <Box
                mb={2}
                textAlign="center"
                background="gray.500"
                color="light.primary"
                p={1}
                borderRadius={5}
                maxW={{ sm: '10rem' }}
              >
                Sentence in english
              </Box>
              <Textarea
                height="10rem"
                background="white"
                resize="none"
                _focus={{}}
                _active={{}}
                _hover={{}}
                borderColor="#c2c2c2ff"
                placeholder="Write something"
                onChange={async (e: FormEvent<HTMLTextAreaElement>) => {
                  setSentenceEn(e.currentTarget.value);
                  setSentenceEnError('');
                }}
              />
              <Text color="tomato">{sentenceEnError}</Text>
            </Box>

            <Box my={5}>
              <Box
                maxW={{ sm: '10rem' }}
                mb={2}
                textAlign="center"
                background="gray.500"
                color="light.primary"
                p={1}
                borderRadius={5}
              >
                Sentence in russian
              </Box>
              <Textarea
                value={sentenceRu}
                height="10rem"
                background="white"
                resize="none"
                _focus={{}}
                _active={{}}
                _hover={{}}
                borderColor="#c2c2c2ff"
                placeholder="Write something"
                onChange={async (e: FormEvent<HTMLTextAreaElement>) => {
                  setSentenceRu(e.currentTarget.value);
                  setSentenceRuError('');
                }}
              />
              <Text color="tomato">{sentenceRuError}</Text>
            </Box>

            {/* Tags */}
            <Text fontSize="20px">Choose tags</Text>

            <Box display="flex" gap="3" flexWrap="wrap" mt={2}>
              {tags.map((tag) => (
                <Box
                  px={2}
                  borderRadius="5"
                  background="#ccccccff"
                  cursor="pointer"
                  boxShadow={
                    selectedTagsIds.includes(tag.id)
                      ? 'inset 0px 0px 5px #35596a82'
                      : 'none'
                  }
                  onClick={() => {
                    if (!selectedTagsIds.includes(tag.id)) {
                      return setSelectedTagsIds((prev) => [...prev, tag.id]);
                    }
                    return setSelectedTagsIds((prev) => [
                      ...prev.filter((tagId) => tagId !== tag.id),
                    ]);
                  }}
                >
                  {tag.tag}
                </Box>
              ))}
            </Box>
            <Button
              py={1}
              height="37px"
              mt={6}
              w="100%"
              _hover={{}}
              _active={{}}
              _focus={{}}
              background="gray.500"
              color="light.primary"
              maxW={{ sm: '10rem' }}
              fontWeight="400"
              type="submit"
            >
              Contribute
            </Button>
          </form>
          <MobileNav />
        </Box>
      </Box>
    </StyledAddSentence>
  );
};
