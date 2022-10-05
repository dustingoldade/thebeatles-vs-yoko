import { Typography, Button, Grid, Box } from "@mui/material";
import "./NewGameBtn.css";

const NewGameBtn = (props) => {
  return (
    <Grid item xs={3}>
      <Box
        display="flex"
        sx={{ justifyContent: "center", alignContect: "center" }}
      >
        <div className="NewGameBtn">
          <Button
            onClick={props.onNewPhraseHandeler}
            color="inherit"
            sx={{ px: "9rem" }}
          >
            <Typography variant="h5">{props.buttonTitle}</Typography>
          </Button>
        </div>
      </Box>
    </Grid>
  );
};

export default NewGameBtn;
