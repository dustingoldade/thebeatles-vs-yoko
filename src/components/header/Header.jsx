import { Box, Typography } from "@mui/material";
import "./Header.css";

const Header = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Typography
        variant="h4"
        textAlign="center"
        className="Header__font-family Header__color"
        sx={{ my: 1 }}
      >
        The Beatles vs Yoko Ono
      </Typography>
    </Box>
  );
};

export default Header;
