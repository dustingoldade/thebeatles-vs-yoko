import { Grid, Box } from "@mui/material";
import Key from "./key/Key";
import { muiStyles } from "../../helpers/muiStyles";
const { DISPLAY_FLEX, ALIGN_ITEMS_CENTER, DIRECTION_COLUMN } = muiStyles;

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

  // VI_COMMENT: I would opt out all textual values to CONSTANTS at the top
  // e.g. you have "center" 4 times, which might be just one CONSTANT
  // Similar to "New game" text: I'd suggest to opt in out to a separate folder
  // called "locales" and store "en.json" file there
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
