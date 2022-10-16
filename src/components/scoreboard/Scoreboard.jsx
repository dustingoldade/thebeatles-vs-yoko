import { Box, Grid } from "@mui/material";
import "./Scoreboard.css";

const Scoreboard = ({
  activeImgs: { activeBeatlesImg, activeYokoImg },
  scoreBoardGridSizes: { leftGrid, rightGrid, centerGrid },
}) => {
  return (
    <Box className="Scoreboard__container">
      <Grid container className="Scoreboard__img">
        <Grid
          item
          xs={leftGrid}
          sx={{
            backgroundImage: `url(${activeBeatlesImg})`,
          }}
          className="Scoreboard__left-grid"
        />
        <Grid item xs={centerGrid} />
        <Grid
          item
          xs={rightGrid}
          sx={{
            backgroundImage: `url(${activeYokoImg})`,
          }}
          className="Scoreboard__right-grid"
        />
      </Grid>
    </Box>
  );
};

export default Scoreboard;
