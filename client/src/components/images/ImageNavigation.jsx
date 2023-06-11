import React from "react";
import PropTypes from "prop-types";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export const ImageNavigation = ({ images = itemData, handleImageClick }) => {
  return (
    <ImageList
      sx={{
        height: "inherit",
        overflowX: "hidden",
      }}
      gap={8}
      cols={1}
      rowHeight={180}
    >
      {images.map((item) => (
        <ImageListItem
          key={item.src}
          sx={{
            width: "180px",
            border: item.isActive ? "4px solid #8034eb" : "0px",
          }}
          onClick={() => handleImageClick(item.conversation)}
        >
          <img
            src={`${item.src}?w=180&h=180&fit=crop&auto=format`}
            srcSet={`${item.src}?w=180&h=180&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

ImageNavigation.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      isActive: PropTypes.bool,
      conversation: PropTypes.number,
    })
  ),
  handleImageClick: PropTypes.func,
};

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
];
