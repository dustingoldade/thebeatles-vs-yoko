import { Grid, Box } from "@mui/material";
import Key from "./key/Key";
import jsonMuiStyles from "../../locales/muiStyles.json";
const { DISPLAY_FLEX, ALIGN_ITEMS_CENTER, DIRECTION_COLUMN } = jsonMuiStyles;

const lettersRowOne = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const lettersRowTwo = ["J", "K", "L", "M", "N", "O", "P", "Q", "R"];
const lettersRowThree = ["S", "T", "U", "V", "W", "X", "Y", "Z"];
const letterRows = [lettersRowOne, lettersRowTwo, lettersRowThree];

const Keyboard = ({
  guessedLettersArray,
  guessedLettersArrayHandler,
  onGuessedLetter,
  activePhrase,
  blockAllLetters,
}) => {
  const isLetterGuessed = (letter) => {
    return guessedLettersArray.includes(letter);
  };

  return (
    <Grid
      container
      direction={DIRECTION_COLUMN}
      alignItems={ALIGN_ITEMS_CENTER}
    >
      {letterRows.map((row, i) => (
        <Grid item xs={3} key={i}>
          <Box display={DISPLAY_FLEX}>
            {row.map((letter) => (
              <Key
                updateGuessedLetters={guessedLettersArrayHandler}
                letter={letter}
                isGuessed={isLetterGuessed(letter)}
                onGuessedLetter={onGuessedLetter}
                activePhrase={activePhrase}
                blockAllLetters={blockAllLetters}
                key={letter}
              />
            ))}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Keyboard;
