import { Box, Grid } from "@mui/material";
import "../../global.css";
import "./Scoreboard.css";

const Scoreboard = (props) => {
  const scoreBoard = [...props.scoreboardArry];
  const leftGrid =
    scoreBoard.reduce((total, i) => (i === "X" ? total + 1 : total), 0) * 3;
  const rightGrid =
    scoreBoard.reduce((total, i) => (i === "O" ? total + 1 : total), 0) * 3;
  const centerGrid = 12 - leftGrid - rightGrid;

  console.log(props.beatlesImg);
  console.log(props.yokoImg);

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
