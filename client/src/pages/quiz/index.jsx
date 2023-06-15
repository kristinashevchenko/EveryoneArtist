import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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
        flexDirection: 'column',
        margin: '10px'
      }}>
      <h4>Your choices:</h4>
      <Box sx={{ flexGrow: 1, height: '90%' }}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          <Grid item xs={10} sx={{ height: 'inherit' }}>
            <ChatContainer />
          </Grid>
          <Grid
            xs={2}
            sx={{
              height: 'inherit',
              bgcolor: '#cfe8fc',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '16px 0px'
            }}>
            <ImageNavigation />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
