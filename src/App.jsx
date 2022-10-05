import { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Modal from "./components/modal/Modal";
import Scoreboard from "./components/scoreboard/Scoreboard";
import GuessedLetters from "./components/guessedLetters/GuessedLetters";
import Keyboard from "./components/keyboard/Keyboard";
import { beatlesImages, yokoImages } from "./img/ImgIndex";
import { phrasesToGuess } from "./data";

let displayWinOrLossModal = false;
let guessedLettersSet = [];
let scoreboardArry = [0, 0, 0, 0];
const winLossScores = {
  theBeatles: 0,
  yoko: 0,
};

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
  if (scoreboardArry.includes("X") || scoreboardArry.includes(0)) return false;
  return true;
}

function updateGuessedLetters(letter) {
  guessedLettersSet.push(letter);
}

function randIndexPositionGenerator(obj) {
  const index = Math.round((obj.length - 1) * Math.random());
  return index;
}

function returnRandomItemInArry(obj) {
  const index = Math.round((obj.length - 1) * Math.random());
  return obj[index];
}

//***************
// RETURN FUNCTION
//***************

function App() {
  const [activePhrase, setActivePhrase] = useState("");
  const [guessedLettersArry, setGuessedLettersArry] =
    useState(guessedLettersSet);
  const [modal, setModal] = useState(false);
  const [activeYokoImg, setActiveYokoImg] = useState(yokoImages[0]);
  const [activeBeatlesImg, setActiveBeatlesImg] = useState(beatlesImages[0]);
  const [blockAllLetters, setblockAllLetters] = useState(true);

  const lettersToDisplay = [];

  function newPhotos() {
    setActiveYokoImg(returnRandomItemInArry(yokoImages));
    setActiveBeatlesImg(returnRandomItemInArry(beatlesImages));
  }

  function checkGuessedLetter(leter, activePhrase) {
    if (activePhrase.includes(leter)) {
      correctGuess();
    } else {
      incorrectGuess();
    }
    // On Win
    if (checkIfWin(activePhrase, guessedLettersSet)) {
      displayWinOrLossModal = "win";
      setModal(true);
      winLossScores.theBeatles += 1;
    }
    // On Loss
    if (checkIfLoss()) {
      winLossScores.yoko += 1;
      displayWinOrLossModal = "loss";
      setModal(true);
    }
  }

  function newPhrase() {
    setblockAllLetters(false);
    guessedLettersSet = [];
    scoreboardArry = [0, 0, 0, 0];
    setGuessedLettersArry([]);
    setActivePhrase(returnRandomItemInArry(phrasesToGuess));
    newPhotos();
  }

  function guessedLettersArryHandler(letter) {
    setGuessedLettersArry([letter, ...guessedLettersArry]);
    updateGuessedLetters(letter);
  }

  function modalNewGame() {
    setModal(false);
    newPhrase();
  }

  for (const letter of activePhrase) {
    if (guessedLettersArry.includes(letter)) {
      lettersToDisplay.push(letter);
    } else if (letter === " ") {
      lettersToDisplay.push("");
    } else {
      lettersToDisplay.push("_");
    }
  }
  return (
    <>
      {modal && (
        <Modal
          winOrLoss={displayWinOrLossModal}
          winnerPhoto={activeBeatlesImg}
          loserPhoto={activeYokoImg}
          activePhrase={activePhrase}
          winLossScores={winLossScores}
          modalNewGame={modalNewGame}
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
        guessedLettersArryHandler={guessedLettersArryHandler}
        newPhraseHandeler={newPhrase}
        guessedLettersArry={guessedLettersArry}
        onGuessedLetter={checkGuessedLetter}
        activePhrase={activePhrase}
      />
    </>
  );
}

export default App;
