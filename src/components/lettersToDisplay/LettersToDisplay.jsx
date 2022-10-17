import { Box, Typography } from "@mui/material";
import "./LettersToDisplay.css";
import jsonMuiStyles from "../../locales/muiStyles.json";
const {
  DISPLAY_FLEX,
  JUSTIFY_CONTENT_CENTER,
  ALIGN_ITEMS_CENTER,
  TEXT_VARIANT_H4,
  TEXT_ALIGN_CENTER,
} = jsonMuiStyles;

const LettersToDisplay = ({ lettersToDisplay }) => {
  return (
    <Box
      display={DISPLAY_FLEX}
      justifyContent={JUSTIFY_CONTENT_CENTER}
      alignItems={ALIGN_ITEMS_CENTER}
      className="LettersToDisplay__height"
    >
      {lettersToDisplay.map((letter, i) => (
        <Box minWidth="1.5rem" sx={{ px: "3px" }} key={"LetterToDisplay" + i}>
          <Typography
            variant={TEXT_VARIANT_H4}
            textAlign={TEXT_ALIGN_CENTER}
            className="LettersToDisplay__letter"
          >
            {letter}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default LettersToDisplay;
