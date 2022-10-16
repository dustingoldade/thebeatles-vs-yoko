import "./App.css";
import { useState, useEffect } from "react";
import { beatlesImages, yokoImages } from "./img/ImgIndex";
import { phrasesToGuess } from "./helpers/data";
import { returnRandomItemInArray, returnGridSize } from "./helpers/utils";
import Header from "./components/header/Header";
import Modal from "./components/modal/Modal";
import Scoreboard from "./components/scoreboard/Scoreboard";
import LettersToDisplay from "./components/lettersToDisplay/LettersToDisplay";
import Keyboard from "./components/keyboard/Keyboard";
import NewGameBtn from "./components/newGameBtn/NewGameBtn";
import { text } from "./helpers/en.json";
const { New_Game_Button_Label } = text;

const App = () => {
  const [blockAllLetters, setBlockAllLetters] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [winModalText, setWinModalText] = useState(true);
  const [activePhrase, setActivePhrase] = useState("");
  const [guessedLettersArray, setGuessedLettersArray] = useState([]);
  const [lettersToDisplay, setLettersToDisplay] = useState([]);
  const [scoreboardArray, setScoreBoardArray] = useState(["_", "_", "_", "_"]);
  const [scoreBoardGridSizes, setScoreBoardGridSizes] = useState({});
  const [activeImgs, setActiveImgs] = useState({
    activeYokoImg: yokoImages[0],
    activeBeatlesImg: beatlesImages[0],
  });
  const [winLossScores, setWinLossScored] = useState({
    theBeatles: 0,
    yoko: 0,
  });

  /////////////////////////
  //// Game Play Logic ////
  /////////////////////////

  const newGame = () => {
    setBlockAllLetters(false);

    //Reset the scoreboard and the letters that have been guessed
    setGuessedLettersArray([]);
    setScoreBoardArray([0, 0, 0, 0]);

    // Pick new photos -- used in ScoreBoard Component and pick a new random phrase
    newPhotos();
    setActivePhrase(returnRandomItemInArray(phrasesToGuess));
    setIsModal(false);
  };

  const checkGuessedLetter = (letter) => {
    setGuessedLettersArray((prevState) => [letter, ...prevState]);
  };
  ////////////////////////////////////////////////////////////////////

  // Check if the game is won or loss:
  useEffect(() => {
    if (guessedLettersArray.length < 1) return;

    activePhrase.includes(guessedLettersArray[0])
      ? correctGuess()
      : incorrectGuess();

    // On Win
    if (checkIfWin(activePhrase, guessedLettersArray)) {
      runWinFunctions();
    }
    // On Loss
    if (checkIfLoss()) {
      runLossFunctions();
    }
  }, [guessedLettersArray]);

  const checkIfWin = (activePhrase, guessedLetters) => {
    for (let i in activePhrase) {
      const activeLetter = activePhrase[i];
      if (activeLetter === " ") {
        continue;
      } //Needed to skip over spaces in the active phrase (occurs when phrases are more than one word)
      if (!guessedLetters.includes(activeLetter)) {
        return false;
      }
    }
    return true;
  };

  const checkIfLoss = () => {
    if (scoreboardArray[0] === -1) return true;
    return false;
  };

  const correctGuess = () => {
    for (let i in scoreboardArray) {
      if (scoreboardArray[i] !== 1) {
        scoreboardArray[i] = 1;
        break;
      }
    }
  };

  const incorrectGuess = () => {
    for (let i in scoreboardArray) {
      const reverseIndex = scoreboardArray.length - 1 - i;
      if (scoreboardArray[reverseIndex] !== -1) {
        scoreboardArray[reverseIndex] = -1;
        return;
      }
    }
  };

  const runWinFunctions = () => {
    setWinModalText(true);
    setIsModal(true);
    setWinLossScored((prevState) => {
      return { ...prevState, theBeatles: prevState.theBeatles++ };
    });
  };

  const runLossFunctions = () => {
    setWinModalText(false);
    setIsModal(true);
    setWinLossScored((prevState) => {
      return { ...prevState, yoko: prevState.yoko++ };
    });
  };

  //######################################

  /////////////////////////
  ///// Display Logic /////
  /////////////////////////

  const newPhotos = () => {
    setActiveImgs({
      activeYokoImg: returnRandomItemInArray(yokoImages),
      activeBeatlesImg: returnRandomItemInArray(beatlesImages),
    });
  };

  useEffect(() => {
    const tempArray = [];
    for (const letter of activePhrase) {
      if (guessedLettersArray.includes(letter)) {
        tempArray.push(letter);
        {
          continue;
        }
      }
      if (letter === " ") {
        tempArray.push(" ");
      } else {
        tempArray.push("_");
      }
    }
    setLettersToDisplay(tempArray);
  }, [guessedLettersArray, activePhrase]);

  //Sets the width of the three different Grid items that occupy the scoreboard and hold either a photo of the Beatles, blank, or Yoko Ono
  useEffect(() => {
    let leftGrid = returnGridSize(scoreboardArray, 1);
    let rightGrid = returnGridSize(scoreboardArray, -1);
    let centerGrid = 12 - leftGrid - rightGrid;
    setScoreBoardGridSizes({
      leftGrid: leftGrid,
      rightGrid: rightGrid,
      centerGrid: centerGrid,
    });
  }, [guessedLettersArray]);
  //######################################
  return (
    <>
      {isModal && (
        <Modal
          winModalText={winModalText}
          activeImgs={activeImgs}
          activePhrase={activePhrase}
          winLossScores={winLossScores}
          newGame={newGame}
        />
      )}
      <Header />
      <Scoreboard
        scoreboardArray={scoreboardArray}
        activeImgs={activeImgs}
        scoreBoardGridSizes={scoreBoardGridSizes}
      />
      <LettersToDisplay lettersToDisplay={lettersToDisplay} />
      <Keyboard
        blockAllLetters={blockAllLetters}
        guessedLettersArray={guessedLettersArray}
        onGuessedLetter={checkGuessedLetter}
        activePhrase={activePhrase}
      />
      <NewGameBtn newGame={newGame} buttonTitle={New_Game_Button_Label} />
    </>
  );
};

export default App;
