import WinsaAndLosses from "./WinsAndLosses";
import "./Modal.css";
import { Box, Typography, Button } from "@mui/material";
import jsonText from "../../locales/en.json";
import jsonMuiStyles from "../../locales/muiStyles.json";
const { Winner_Modal_Phrase, Loser_Modal_Phrase, Play_Again_Button } = jsonText;
const { TEXT_VARIANT_H5, TEXT_VARIANT_H6 } = jsonMuiStyles;

const Modal = ({
  activeImgs,
  activePhrase,
  winModalText,
  winLossScores,
  newGame,
}) => {
  let pic = activeImgs.activeBeatlesImg;
  let phrase = Winner_Modal_Phrase;

  if (!winModalText) {
    pic = activeImgs.activeYokoImg;
    phrase = Loser_Modal_Phrase;
  }

  const ModalContent = (
    <>
      <img src={pic} className="Modal__img" />
      <Box sx={{ py: "1rem" }}>
        <Typography variant={TEXT_VARIANT_H5}>{phrase}</Typography>
        <Typography variant={TEXT_VARIANT_H6}>"{activePhrase}"</Typography>
      </Box>
    </>
  );

  return (
    <Box className="Modal__overlay">
      <Box className="Modal__card">
        {ModalContent}
        <WinsaAndLosses winLossScores={winLossScores} />
        <Button sx={{ mt: "1rem" }} variant="contained" onClick={newGame}>
          {Play_Again_Button}
        </Button>
      </Box>
    </Box>
  );
};

export default Modal;
