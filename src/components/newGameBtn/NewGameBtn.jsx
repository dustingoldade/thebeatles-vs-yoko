import { Typography, Button, Grid, Box } from "@mui/material";
import "./NewGameBtn.css";
import { muiStyles } from "../../helpers/muiStyles";
const { DISPLAY_FLEX, JUSTIFY_CONTENT_CENTER, COLOR_INHERIT, TEXT_VARIANT_H5 } =
  muiStyles;

const NewGameBtn = ({ newGame, buttonTitle }) => {
  return (
    <Grid item xs={3}>
      <Box display={DISPLAY_FLEX} justifyContent={JUSTIFY_CONTENT_CENTER}>
        <div className="NewGameBtn">
          <Button onClick={newGame} color={COLOR_INHERIT} sx={{ px: "9rem" }}>
            <Typography variant={TEXT_VARIANT_H5}>{buttonTitle}</Typography>
          </Button>
        </div>
      </Box>
    </Grid>
  );
};

export default NewGameBtn;
