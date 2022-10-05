import WinsaAndLosses from "./WinsAndLosses";
import { Box, Typography, Button } from "@mui/material";
import "./Modal.css";

const Modal = (props) => {
  let pic = props.winnerPhoto;
  let phrase = "You got the correct song!!";

  if (props.winOrLoss === "loss") {
    pic = props.loserPhoto;
    phrase = "Loser! The correct song was: ";
  }

  const ModalContent = (
    <>
      <img src={pic} className="Modal__img" />
      <Box sx={{ py: "1rem" }}>
        <Typography variant="h5">{phrase}</Typography>
        <Typography variant="h6">"{props.activePhrase}"</Typography>
      </Box>
    </>
  );

  return (
    <Box className="Modal__overlay">
      <Box className="Modal__card">
        {ModalContent}
        <WinsaAndLosses winLossScores={props.winLossScores} />
        <Button
          sx={{ mt: "1rem" }}
          variant="contained"
          onClick={props.modalNewGame}
        >
          Play Again?
        </Button>
      </Box>
    </Box>
  );
};

export default Modal;
