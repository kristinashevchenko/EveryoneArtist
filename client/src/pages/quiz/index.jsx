import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { ChatContainer } from '../../components/messages/ChatContainer';
import { ImageNavigation } from '../../components/images/ImageNavigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUser,
  updateConversations
} from '../../storage/reducers/conversation';
import { getMessages } from '../../storage/session/utils';
import { MODES } from '../../api/constants/modes';
import './quiz.css';
import { updateMode } from '../../storage/reducers/app';

export async function loader({ params }) {
  const user = params.userId;
  return user;
}

export const QuizPage = () => {
  const dispatch = useDispatch();
  const user = useLoaderData();
  const userId = useSelector((state) => state.conversations.userId);
  const mode = useSelector((state) => state.app.mode);

  useEffect(() => {
    if (userId) {
      const conversations = getMessages({ userId });
      dispatch(updateConversations(conversations));
    } else {
      dispatch(updateUser(user));
    }
  }, [userId]);

  const handleModeChange = (event) => {
    dispatch(updateMode({ mode: event.target.value }));
  };

  return (
    <Box
      sx={{
        height: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#7230C7',
          height: '64px'
        }}>
        <Toolbar
          sx={{
            justifyContent: 'space-between'
          }}>
          <Typography variant="h6">EveryoneArtist</Typography>
          <FormControl
            variant="standard"
            sx={{
              m: 1,
              minWidth: 120,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: '10px'
            }}>
            <div>Mode</div>
            <Select
              labelId="mode-select-label"
              id="mode-select"
              value={mode}
              onChange={handleModeChange}
              sx={{ color: 'white' }}
              className="mode-select"
              label="Mode">
              <MenuItem value={MODES.DESTRUCTIVE_MODE}>
                {MODES.DESTRUCTIVE_MODE}
              </MenuItem>
              <MenuItem value={MODES.CHANGE_MODE}>{MODES.CHANGE_MODE}</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        sx={{ height: 'calc(100% - 64px)' }}>
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
        <Box gridColumn="span 2" sx={{ height: '100%', minHeight: 0 }}>
          <ImageNavigation />
        </Box>
      </Box>
    </Box>
  );
};
