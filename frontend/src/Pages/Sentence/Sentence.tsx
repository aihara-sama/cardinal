import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { request } from '../../API/request';
import { StyledSentence } from './StyledSentence';
import { Box, Text, Image } from '@chakra-ui/react';
import { Header } from '../../Components/Header/Header';
import { Sidebar } from '../../Components/Sidebar/Sidebar';
import thumbUp from '../../assets/images/hand-thumbs-up.svg';
import eye from '../../assets/images/eye.svg';
import chatDots from '../../assets/images/chat-dots.svg';

export const Sentence = () => {
  const [sentence, setSentence] = useState<{
    id: number;
    en: string;
    ru: string;
    author: { id: number; username: string };
    sentenceTags: { id: number; tag: string }[];
    _count: {
      comments: number;
      sentenceLikes: number;
      sentenceViews: number;
    };
  } | null>(null);
  const params = useParams();

  useEffect(() => {
    (async () => {
      const { error, data } = await request(`/sentences/${params.sentenceId}`);
      if (error) return console.error({ error });
      setSentence(data);
    })();
  }, []);

  return (
    <StyledSentence>
      <Box display={{ md: 'flex' }}>
        <Box>
          <Header />
          <Sidebar />
        </Box>

        {/* Sentence */}
        <Box m="pageMargin">
          {/* Tags */}
          {/* <Box mb={3} display="flex" gap="3" flexWrap="wrap" mt={2}>
            {sentence?.sentenceTags.map((tag) => (
              <Box
                display="flex"
                alignItems="center"
                px={2}
                borderRadius="5"
                background="#ccccccff"
                cursor="pointer"
                fontSize="0.8rem"
              >
                {tag.tag}
              </Box>
            ))}
          </Box> */}
          {/* Sentence en */}
          <Box>
            <Text fontSize="1.1rem" fontWeight="600">
              Sentence in english
            </Text>
            <Box fontSize=".9rem" bg="#e3e6e994" borderRadius="6px" p={2}>
              {sentence && sentence.en}
            </Box>
          </Box>
          {/* Setnence ru */}
          <Box mt={5}>
            <Text fontSize="1.1rem" fontWeight="600">
              Sentence in russian
            </Text>
            <Box fontSize=".9rem" bg="#e3e6e994" borderRadius="6px" p={2}>
              {sentence && sentence.ru}
            </Box>
          </Box>

          {/* Meta */}
          <Box mt={4} display="flex" mb={4}>
            <Box display="flex" mr="4" color="#808080ff">
              <Image src={thumbUp} mr="1" />
              {sentence && sentence._count.sentenceLikes}
            </Box>
            <Box display="flex" mr="4" color="#808080ff">
              <Image src={eye} mr="1" />
              {sentence && sentence._count.sentenceViews}
            </Box>
            <Box display="flex" mr="4" color="#808080ff">
              <Image src={chatDots} mr="1" />
              {sentence && sentence._count.comments}
            </Box>
          </Box>
          <hr
            style={{
              borderColor: '#b3b3b3',
              marginTop: '.7rem',
              marginBottom: '.7rem',
            }}
          />

          {/* Comments
          <Box>
            <Text mt={4} fontSize="1.1rem" fontWeight="600">
              Comments
            </Text>
            {sentence && sentence.comments.map((comment) => <Box></Box>)}
          </Box> */}
        </Box>
      </Box>
    </StyledSentence>
  );
};
