import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const BackButton = () => {
  return (
    <Link to={-1}>
      <Button variant="contained">Back</Button>
    </Link>
  );
};

export default BackButton;
