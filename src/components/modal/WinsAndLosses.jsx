import { Box, Typography } from "@mui/material";

const WinsaAndLosses = ({ winLossScores }) => {
  return (
    <Box>
      <Typography>The Beatles: {winLossScores.theBeatles}</Typography>
      <Typography>Yoko Ono: {winLossScores.yoko}</Typography>
    </Box>
  );
};

export default WinsaAndLosses;
