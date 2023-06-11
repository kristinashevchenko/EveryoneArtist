import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export const GenerateButton = ({ onClick }) => {
  return (
    <Box
      sx={{
        height: "10%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button variant="outlined" onClick={onClick}>
        Generate
      </Button>
    </Box>
  );
};

GenerateButton.propTypes = {
  onClick: PropTypes.func,
};
