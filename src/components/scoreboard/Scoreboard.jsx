import { Box, Grid } from "@mui/material";
import "./Scoreboard.css";

const Scoreboard = (props) => {
  const scoreBoard = [...props.scoreboardArray];
  const leftGrid =
    scoreBoard.reduce((total, i) => (i === "X" ? total + 1 : total), 0) * 3;
  const rightGrid =
    scoreBoard.reduce((total, i) => (i === "O" ? total + 1 : total), 0) * 3;
  const centerGrid = 12 - leftGrid - rightGrid;

  return (
    <Box className="Scoreboard__container">
      <Grid container className="Scoreboard__img">
        <Grid
          item
          xs={leftGrid}
          sx={{
            backgroundImage: `url(${props.beatlesImg})`,
          }}
          className="Scoreboard__left-grid"
        />
        <Grid item xs={centerGrid} />
        <Grid
          item
          xs={rightGrid}
          sx={{
            backgroundImage: `url(${props.yokoImg})`,
          }}
          className="Scoreboard__right-grid"
        />
      </Grid>
    </Box>
  );
};

export default Scoreboard;
