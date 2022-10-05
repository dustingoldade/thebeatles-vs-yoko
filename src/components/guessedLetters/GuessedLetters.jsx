import { Box, Typography } from "@mui/material";
import "./GuessedLetters.css";

const GuessedLetters = (props) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className="GuessedLetters__height"
    >
      {props.lettersToDisplay.map((letter) => (
        <Box minWidth="1.5rem" sx={{ px: "3px" }}>
          <Typography
            variant="h4"
            textAlign="center"
            className="GuessedLetters__letter"
          >
            {letter}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default GuessedLetters;
