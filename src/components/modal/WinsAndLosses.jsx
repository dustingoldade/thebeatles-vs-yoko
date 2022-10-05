import { Box, Typography } from "@mui/material";

const WinsaAndLosses = (props) => {
  return (
    <Box>
      <Typography>The Beatles: {props.winLossScores.theBeatles}</Typography>
      <Typography>Yoko Ono: {props.winLossScores.yoko}</Typography>
    </Box>
  );
};

export default WinsaAndLosses;
