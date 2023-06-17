import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useDispatch, useSelector } from 'react-redux';
import { updateActiveConversation } from '../../storage/reducers/conversation';

export const ImageNavigation = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);
  const activeConversationId = useSelector((state) => {
    return state.conversations.activeConversationId;
  });

  const handleImageClick = (conversationId) => {
    dispatch(updateActiveConversation({ newConversationId: conversationId }));
  };

  return (
    <ImageList
      sx={{
        height: 'inherit',
        overflowX: 'hidden',
        margin: 0
      }}
      gap={8}
      cols={1}
      rowHeight={180}>
      {images.map((image, index) => (
        <ImageListItem
          key={image.imageUrl}
          sx={{
            width: '180px',
            border: index === activeConversationId ? '4px solid #8034eb' : '0px'
          }}
          onClick={() => handleImageClick(index)}>
          <img
            src={`${image.imageUrl}?w=180&h=180&fit=crop&auto=format`}
            srcSet={`${image.imageUrl}?w=180&h=180&fit=crop&auto=format&dpr=2 2x`}
            alt={image.generatedPrompt}
            title={image.generatedPrompt}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
