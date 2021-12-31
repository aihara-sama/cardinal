import React, { useEffect, useState } from 'react';
import { Box, Text, Image } from '@chakra-ui/react';
import { StyledHome } from './StyledHome';
import { Header } from '../../Components/Header/Header';
import { MobileNav } from '../../Components/MobileNav/MobileNav';
import { request } from '../../API/request';
import thumbUp from '../../assets/images/hand-thumbs-up.svg';
import eye from '../../assets/images/eye.svg';
import chatDots from '../../assets/images/chat-dots.svg';
import { Link } from 'react-router-dom';
import { Sidebar } from '../../Components/Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../app/hooks';

export const Home = () => {
  const firebaseApp = useAppSelector((state) => state.firebase.firebaseApp);
  console.log({ firebaseApp });

  // const [sentences, setSentences] = useState<
  //   {
  //     id: number;
  //     en: string;
  //     author: { id: number; username: string };
  //     sentenceTags: { id: number; tag: string }[];
  //     _count: {
  //       comments: number;
  //       sentenceLikes: number;
  //       sentenceViews: number;
  //     };
  //   }[]
  // >([]);
  // useEffect(() => {
  //   (async () => {
  //     const { error, data } = await request('/sentences');
  //     if (error) return console.error({ error });
  //     setSentences(data);
  //   })();
  // }, []);

  return <div>Working</div>;
  return (
    <StyledHome>
      <Box display={{ md: 'flex' }}>
        <Box>
          <Header />
          <Sidebar />
        </Box>

        {/* Sentences */}
        <Box m="pageMargin" flexBasis="100%">
          {sentences.map((sentence) => (
            <Box mb={5}>
              <Box display="flex" justifyContent="space-between">
                {/* Author */}
                <Box display="flex" fontSize="0.9rem" color="#52768eff">
                  <Text mr="1" color="gray">
                    by
                  </Text>
                  <Link to={`/users/${sentence.author.id}`}>
                    {sentence.author.username}
                  </Link>
                </Box>

                {/* Meta */}
                <Box display="flex">
                  <Box display="flex" mr="4" color="#808080ff">
                    <Image src={thumbUp} mr="1" />
                    {sentence._count.sentenceLikes}
                  </Box>
                  <Box display="flex" mr="4" color="#808080ff">
                    <Image src={eye} mr="1" />
                    {sentence._count.sentenceViews}
                  </Box>
                  <Box display="flex" mr="4" color="#808080ff">
                    <Image src={chatDots} mr="1" />
                    {sentence._count.comments}
                  </Box>
                  <Box
                    alignSelf="center"
                    ml="2"
                    display="flex"
                    alignItems="center"
                    px="7"
                    bg="#6d6d6d42"
                    color="#646d7cff"
                    borderRadius="20"
                    fontSize=".8rem"
                  >
                    <Link to={`/sentences/${sentence.id}`}>Read</Link>
                  </Box>
                </Box>
              </Box>

              <Box mb="3" p="2" className="special-border" borderWidth="2px">
                <Text fontSize="0.9rem">{sentence.en}</Text>
              </Box>
              <Box display="flex" gap="3" flexWrap="wrap" mt={2}>
                {sentence.sentenceTags.map((tag) => (
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
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <MobileNav />
    </StyledHome>
  );
};
