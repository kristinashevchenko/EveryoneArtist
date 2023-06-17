import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ChatContainer } from '../../components/messages/ChatContainer';
import { ImageNavigation } from '../../components/images/ImageNavigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUser,
  updateConversations
} from '../../storage/reducers/conversation';
import { getMessages } from '../../storage/session/utils';

export async function loader({ params }) {
  const user = params.userId;
  return user;
}

export const QuizPage = () => {
  const dispatch = useDispatch();
  const user = useLoaderData();
  const userId = useSelector((state) => state.conversations.userId);

  useEffect(() => {
    if (userId) {
      const conversations = getMessages({ userId });
      dispatch(updateConversations(conversations));
    } else {
      dispatch(updateUser(user));
    }
  }, [userId]);

  return (
    <Box
      sx={{
        height: 'inherit',
        display: 'flex',
        flexDirection: 'column'
      }}>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap={2}
        sx={{ height: '100%' }}>
        <Box
          gridColumn="span 10"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: '7px',
            backgroundColor: '#fffdfa',
            boxShadow: 'rgb(149 157 165 / 20%) 0px 8px 24px',
            paddingLeft: '10px',
            minHeight: 0
          }}>
          <ChatContainer />
        </Box>
        <Box gridColumn="span 2" sx={{ height: '100%' }}>
          <ImageNavigation />
        </Box>
      </Box>
    </Box>
  );
};
