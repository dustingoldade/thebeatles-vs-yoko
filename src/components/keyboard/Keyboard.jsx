import { Grid, Box } from "@mui/material";
import Key from "./Key";
import NewGameBtn from "./NewGameBtn";
// VI_COMMENT: example of having the centralized source of constants
import { JUSTIFY_CONTENT_CENTER, ALIGN_ITEMS_CENTER } from "../../constants";

const lettersRowOne = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const lettersRowTwo = ["J", "K", "L", "M", "N", "O", "P", "Q", "R"];
const lettersRowThree = ["S", "T", "U", "V", "W", "X", "Y", "Z"];
const letterRows = [lettersRowOne, lettersRowTwo, lettersRowThree];

const Keyboard = (props) => {
  function isLetterGuessed(letter) {
    return props.guessedLettersArray.includes(letter);
  }

  // VI_COMMENT: I would opt out all textual values to CONSTANTS at the top
  // e.g. you have "center" 4 times, which might be just one CONSTANT
  // Similar to "New game" text: I'd suggest to opt in out to a separate folder
  // called "locales" and store "en.json" file there
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {letterRows.map((row, i) => (
        <Grid item xs={3} key={i}>
          <Box
            display="flex"
            sx={{ justifyContent: JUSTIFY_CONTENT_CENTER, alignContect: "center" }} // VI_COMMENT: alignContent? typo?
          >
            {row.map((letter) => (
              <Key
                updateGuessedLetters={props.guessedLettersArrayHandler}
                letter={letter}
                isGuessed={isLetterGuessed(letter)}
                onGuessedLetter={props.onGuessedLetter}
                activePhrase={props.activePhrase}
                blockAllLetters={props.blockAllLetters}
                key={letter}
              />
            ))}
          </Box>
        </Grid>
      ))}

      <NewGameBtn buttonTitle="New Game" newGame={props.newGame} />
    </Grid>
  );
};

export default Keyboard;
