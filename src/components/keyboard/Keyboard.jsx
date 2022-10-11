import { Grid, Box } from "@mui/material";
import Key from "./Key";
import NewGameBtn from "./NewGameBtn";

const lettersRowOne = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const lettersRowTwo = ["J", "K", "L", "M", "N", "O", "P", "Q", "R"];
const lettersRowThree = ["S", "T", "U", "V", "W", "X", "Y", "Z"];
const letterRows = [lettersRowOne, lettersRowTwo, lettersRowThree];

const Keyboard = (props) => {
  function isLetterGuessed(letter) {
    return props.guessedLettersArray.includes(letter);
  }

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
            sx={{ justifyContent: "center", alignContect: "center" }}
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
