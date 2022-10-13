import { Typography, Button, Grid, Box } from "@mui/material";
import "./NewGameBtn.css";
// VI_COMMENT: example of having the centralized source of constants
import { JUSTIFY_CONTENT_CENTER } from "../../constants";

const NewGameBtn = (props) => {

  // VI_COMMENT: use destruct
  const {
    newGame,
    buttonTitle
  } = props;

  return (
    <Grid item xs={3}>
      <Box
        display="flex"
        sx={{ justifyContent: JUSTIFY_CONTENT_CENTER, alignContect: "center" }}
      >
        <div className="NewGameBtn">
          <Button onClick={newGame} color="inherit" sx={{ px: "9rem" }}>
            <Typography variant="h5">{buttonTitle}</Typography>
          </Button>
        </div>
      </Box>
    </Grid>
  );
};

export default NewGameBtn;
