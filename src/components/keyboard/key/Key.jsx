import { Typography, Button } from "@mui/material";
import "./Key.css";
import { muiStyles } from "../../../helpers/muiStyles";
const { TEXT_VARIANT_H5 } = muiStyles;

const Key = ({
  isGuessed,
  blockAllLetters,
  letter,
  activePhrase,
  onGuessedLetter,
}) => {
  let additionalClasses = `Key ${isGuessed && "Key__disabled"} ${
    blockAllLetters && "Key__disabled"
  }`;

  return (
    <Button
      key={`key${letter}`}
      sx={{ border: 2, m: "2px" }}
      onClick={() => {
        onGuessedLetter(letter, activePhrase);
      }}
      className={additionalClasses}
    >
      <Typography variant={TEXT_VARIANT_H5}>{letter}</Typography>
    </Button>
  );
};

export default Key;
