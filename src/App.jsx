import "./App.css";
import { useState, useEffect } from "react";
import { beatlesImages, yokoImages } from "./img/ImgIndex";
import { phrasesToGuess } from "./helpers/data";
import { returnRandomItemInArray } from "./helpers/utils";
import Header from "./components/header/Header";
import Modal from "./components/modal/Modal";
import Scoreboard from "./components/scoreboard/Scoreboard";
import GuessedLetters from "./components/guessedLetters/GuessedLetters";
import Keyboard from "./components/keyboard/Keyboard";

// VI_COMMENT: review your comments
// there are places, where they are unnecessary, e.g.
// "Unblocks all letters (game starts with blocked letters)"  -the function
// which is called there has a good meaningful name, so it's obvious
// from the code what's happening

// VI_COMMENT: function App() { => const App = () => {...}
// Just like you did with other components, like Key or Keyboard
function App() {

  // VI_COMMENT: I guess there is too much useStates. We could combine 
  // a few to one to avoid unnecessary re-renders. Like:
  //  - activeYokoImg + activeBeatlesImg = {activeYokoImg: ..., activeBeatlesImg: ...}
  //  - I feel like lettersToDisplay and lettersToDisplay could be one array
  const [blockAllLetters, setBlockAllLetters] = useState(true); //used at game start only to block letters
  const [isModal, setIsModal] = useState(false);
  const [displayWinOrLossModal, setDisplayWinOrLossModa] = useState("");
  const [activeYokoImg, setActiveYokoImg] = useState(yokoImages[0]);
  const [activeBeatlesImg, setActiveBeatlesImg] = useState(beatlesImages[0]);
  const [activePhrase, setActivePhrase] = useState("");
  const [guessedLettersArray, setGuessedLettersArray] = useState([]);
  const [lettersToDisplay, setLettersToDisplay] = useState([]);
  const [scoreboardArray, setScoreBoardArray] = useState(["_", "_", "_", "_"]);
  const [winLossScores, setWinLossScored] = useState({
    theBeatles: 0,
    yoko: 0,
  });

  /////////////////////////
  //// Game Play Logic ////
  /////////////////////////

  const newGame = () => {
    setBlockAllLetters(false); //Unblocks all letters (game starts with blocked letters)

    //Reset the scoreboard and the letters that have been guessed
    setGuessedLettersArray([]);
    setScoreBoardArray(["_", "_", "_", "_"]);

    // Pick new photos -- used in ScoreBoard Component and pick a new random phrase
    newPhotos();
    setActivePhrase(returnRandomItemInArray(phrasesToGuess));

    //Turn of modal (May or my not be displayed)
    setIsModal(false);
  };

  const checkGuessedLetter = (letter) => {
    setGuessedLettersArray((prevState) => [letter, ...prevState]);
  };
  ////////////////////////////////////////////////////////////////////

  // VI_COMMENT: need to split this into smaller pieces, it's hard to read
  // when you have to scroll the function
  useEffect(() => {
    if (guessedLettersArray.length < 1) return;

    // VI_COMMENT: you could use a shorthand of "? :" instead of if/else
    if (activePhrase.includes(guessedLettersArray[0])) {
      correctGuess();
    } else {
      incorrectGuess();
    }

    // Check if the game is won or loss:
    // On Win
    if (checkIfWin(activePhrase, guessedLettersArray)) {
      setDisplayWinOrLossModa("win"); // VI_COMMENT: would go with boolean
      setIsModal(true);
      setWinLossScored((prevState) => {
        return { ...prevState, theBeatles: prevState.theBeatles++ };
      });
    }
    // On Loss
    if (checkIfLoss()) {
      setDisplayWinOrLossModa("loss");  // VI_COMMENT: would go with boolean
      setIsModal(true);
      setWinLossScored((prevState) => {
        return { ...prevState, yoko: prevState.yoko++ };
      });
    }
  }, [guessedLettersArray]);

  const checkIfWin = (activePhrase, guessedLetters) => {
    for (let i in activePhrase) {
      const activeLetter = activePhrase[i];
      if (activeLetter !== " ") {
        if (guessedLetters.includes(activeLetter)) { // VI_COMMENT:empty if block? use !
        } else {
          return false;
        }
      } else { // VI_COMMENT: no need in this else block
      }
    }
    return true;
  };

  const checkIfLoss = () => {
    if (scoreboardArray[0] === "O") return true;
    return false;
  };

  const correctGuess = () => {
    for (let i in scoreboardArray) {
      if (scoreboardArray[i] !== "X") {
        scoreboardArray[i] = "X";
        break;
      }
    }
  };

  const incorrectGuess = () => {
    for (let i in scoreboardArray) {
      const reverseIndex = scoreboardArray.length - 1 - i;
      if (scoreboardArray[reverseIndex] !== "O") {
        scoreboardArray[reverseIndex] = "O";
        return;
      }
    }
  };
  //############################################################################################################

  /////////////////////////
  ///// Display Logic /////
  /////////////////////////

  // Sets the photos displayed in the Scoredboard component to new, random photos:
  const newPhotos = () => {
    setActiveYokoImg(returnRandomItemInArray(yokoImages));
    setActiveBeatlesImg(returnRandomItemInArray(beatlesImages));
  };

  useEffect(() => {
    const tempArray = [];
    for (const letter of activePhrase) {
      if (guessedLettersArray.includes(letter)) {
        tempArray.push(letter);
      } else if (letter === " ") {
        tempArray.push("");
      } else {
        tempArray.push("_");
      }
    }
    setLettersToDisplay(tempArray);
  }, [guessedLettersArray, activePhrase]);
  //############################################################################################################
  return (
    <>
      {isModal && (
        <Modal
          winOrLoss={displayWinOrLossModal}
          winnerPhoto={activeBeatlesImg}
          loserPhoto={activeYokoImg}
          activePhrase={activePhrase}
          winLossScores={winLossScores}
          newGame={newGame}
        />
      )}
      <Header />
      <Scoreboard
        scoreboardArray={scoreboardArray}
        yokoImg={activeYokoImg}
        beatlesImg={activeBeatlesImg}
      />
      <GuessedLetters lettersToDisplay={lettersToDisplay} />
      <Keyboard
        blockAllLetters={blockAllLetters}
        newGame={newGame}
        guessedLettersArray={guessedLettersArray}
        onGuessedLetter={checkGuessedLetter}
        activePhrase={activePhrase}
      />
    </>
  );
}

export default App;
