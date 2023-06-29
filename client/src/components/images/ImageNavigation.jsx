import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ImageListItemBar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateActiveConversation } from '../../storage/reducers/conversation';
import DefaultImage from './no_image.jpg';

export const ImageNavigation = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);
  const activeConversationId = useSelector((state) => {
    return state.conversations.activeConversationId;
  });

  const handleImageClick = (conversationId) => {
    dispatch(updateActiveConversation({ newConversationId: conversationId }));
  };

  const imageListStyle =
    images.length <= 3 ? { height: 'fit-content' } : { height: '100%' };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        overflowY: 'auto'
      }}>
      <ImageList
        sx={{
          ...imageListStyle,
          overflowX: 'hidden',
          margin: 0
        }}
        gap={8}
        cols={1}
        rowHeight={180}>
        {images.map((image, index) => (
          <ImageListItem
            key={image.imageUrl || index}
            sx={{
              width: '180px',
              border:
                index === activeConversationId
                  ? '4px solid #8034eb'
                  : '4px solid transparent',
              boxShadow:
                index === activeConversationId
                  ? '0px 0px 10px 3px rgba(0,0,0,0.25)'
                  : 'none',
              borderRadius: '15px',
              margin: 2,
              boxSizing: 'border-box',
              cursor: 'pointer',
              // transform: 'translateX(-10px)',
              '&:hover': {
                boxShadow: '0px 0px 10px 3px rgba(0,0,0,0.25)'
              }
            }}
            onClick={() => handleImageClick(index)}>
            <img
              src={image.imageUrl || DefaultImage}
              srcSet={image.imageUrl || DefaultImage}
              alt={image.generatedPrompt}
              title={image.generatedPrompt}
              loading="lazy"
              style={{ borderRadius: '11px' }}
            />
            <ImageListItemBar
              sx={{
                '.MuiImageListItemBar-title': {
                  whiteSpace: 'normal',
                  fontSize: '14px',
                  lineHeight: '20px',
                  textAlign: 'center'
                }
              }}
              title={image.generatedPrompt}
              style={{ borderRadius: '11px' }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};
