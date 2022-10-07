import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Modal from "./components/modal/Modal";
import Scoreboard from "./components/scoreboard/Scoreboard";
import GuessedLetters from "./components/guessedLetters/GuessedLetters";
import Keyboard from "./components/keyboard/Keyboard";
import { beatlesImages, yokoImages } from "./img/ImgIndex";
import { phrasesToGuess } from "./helpers/data";
import { returnRandomItemInArry } from "./helpers/utils";

function App() {
  const [blockAllLetters, setBlockAllLetters] = useState(true); //used at game start only to black letters
  const [isModal, setIsModal] = useState(false);
  const [displayWinOrLossModal, setDisplayWinOrLossModa] = useState("");
  const [activeYokoImg, setActiveYokoImg] = useState(yokoImages[0]);
  const [activeBeatlesImg, setActiveBeatlesImg] = useState(beatlesImages[0]);
  const [activePhrase, setActivePhrase] = useState("");
  const [guessedLettersArry, setGuessedLettersArry] = useState([]);
  const [lettersToDisplay, setLettersToDisplay] = useState([]);
  const [scoreboardArry, setScoreBoardArry] = useState(["_", "_", "_", "_"]);
  const [winLossScores, setWinLossScored] = useState({
    theBeatles: 0,
    yoko: 0,
  });

  /////////////////////////
  //// Game Play Logic ////
  /////////////////////////

  function newGame() {
    setBlockAllLetters(false); //Unblocks all letters (game starts with blocked letters)

    //Reset the scoreboard and the letters that have been guessed
    setGuessedLettersArry([]);
    setScoreBoardArry(["_", "_", "_", "_"]);

    // Pick new photos -- used in ScoreBoard Component and pick a new random phrase
    newPhotos();
    setActivePhrase(returnRandomItemInArry(phrasesToGuess));

    //Turn of modal (May or my not be displayed)
    setIsModal(false);
  }

  function checkGuessedLetter(letter, activePhrase) {
    // THIS IS WEAK //
    // Here -- we need to update the state with the setter. However, the change in state is put later in priority than the correctGuess or incorrectGeuess functions that are called immediately after,  which causes bugs. To get around this, I pushed the letter the the guessedLettersArray, which is then temporatily apart the guessedLettersArry as it's paddes through the other functions, but then dismissed in the state update.... It works, but it's sloppy.
    setGuessedLettersArry((prevState) => [letter, ...prevState]);
    guessedLettersArry.push(letter);
    ///

    if (activePhrase.includes(letter)) {
      correctGuess();
    } else {
      incorrectGuess();
    }
    // Check if the game is won or loss:
    // On Win
    if (checkIfWin(activePhrase, guessedLettersArry)) {
      setDisplayWinOrLossModa("win");
      setIsModal(true);
      winLossScores.theBeatles += 1;
    }
    // On Loss
    if (checkIfLoss()) {
      winLossScores.yoko += 1;
      setDisplayWinOrLossModa("loss");
      setIsModal(true);
    }
  }

  function checkIfWin(activePhrase, guessedLetters) {
    for (let i in activePhrase) {
      const activeLetter = activePhrase[i];
      if (activeLetter !== " ") {
        if (guessedLetters.includes(activeLetter)) {
        } else {
          return false;
        }
      } else {
      }
    }
    return true;
  }

  function checkIfLoss() {
    if (scoreboardArry.includes("X") || scoreboardArry.includes("_"))
      return false;
    return true;
  }

  function correctGuess() {
    for (let i in scoreboardArry) {
      if (scoreboardArry[i] !== "X") {
        scoreboardArry[i] = "X";
        break;
      }
    }
  }
  function incorrectGuess() {
    for (let i in scoreboardArry) {
      const reverseIndex = scoreboardArry.length - 1 - i;
      if (scoreboardArry[reverseIndex] !== "O") {
        scoreboardArry[reverseIndex] = "O";
        return;
      }
    }
  }
  //############################################################################################################

  /////////////////////////
  ///// Display Logic /////
  /////////////////////////

  // Sets the photos displayed in the Scoredboard component to new, random photos:
  function newPhotos() {
    setActiveYokoImg(returnRandomItemInArry(yokoImages));
    setActiveBeatlesImg(returnRandomItemInArry(beatlesImages));
  }

  useEffect(() => {
    const tempArray = [];
    for (const letter of activePhrase) {
      if (guessedLettersArry.includes(letter)) {
        tempArray.push(letter);
      } else if (letter === " ") {
        tempArray.push("");
      } else {
        tempArray.push("_");
      }
    }
    setLettersToDisplay(tempArray);
  }, [guessedLettersArry, activePhrase]);
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
        scoreboardArry={scoreboardArry}
        yokoImg={activeYokoImg}
        beatlesImg={activeBeatlesImg}
      />
      <GuessedLetters lettersToDisplay={lettersToDisplay} />
      <Keyboard
        blockAllLetters={blockAllLetters}
        newGame={newGame}
        guessedLettersArry={guessedLettersArry}
        onGuessedLetter={checkGuessedLetter}
        activePhrase={activePhrase}
      />
    </>
  );
}

export default App;
