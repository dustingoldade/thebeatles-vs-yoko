import { Typography, Button } from "@mui/material";
import "./Key.css";

const Key = (props) => {
  let additionalClasses = `Key ${props.isGuessed && "Key__disabled"} ${
    props.blockAllLetters && "Key__disabled"
  }`;

  return (
    <Button
      key={`key${props.letter}`}
      sx={{ border: 2, m: "2px" }}
      onClick={() => {
        props.onGuessedLetter(props.letter, props.activePhrase);
      }}
      className={additionalClasses}
    >
      <Typography variant="h5">{props.letter}</Typography>
    </Button>
  );
};

export default Key;
