import { OptionButtonProps } from "@/app/types/testsType";
import { Button, Box, Typography } from "@mui/material";

export default function OptionButton({
  option,
  question,
  isSelected,
  onSelect,
  isCorrect,
  disabled
}: OptionButtonProps) {

  let backgroundColor = "background.paper";
  let borderColor = "divider";
  let textColor = "text.primary";

  if (isSelected) {
    backgroundColor = isCorrect ? "#4caf50" : "#f44336";
    borderColor = isCorrect ? "#388e3c" : "#d32f2f";
    textColor = "white";
  }

  return (
    <Button
      key={option.id}
      onClick={() => {
        onSelect(question.id, option.id, option.text);
      }}
      variant="outlined"
      fullWidth
      disabled={disabled}
      sx={{
        justifyContent: "flex-start",
        textAlign: "left",
        p: { xs: 1.5, sm: 2 },
        borderRadius: 3,
        textTransform: "none",
        fontSize: { xs: "0.9rem", sm: "1rem" },
        fontWeight: "normal",
        color: textColor,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: "primary.main",
          backgroundColor: isSelected ? backgroundColor : "action.hover",
          transform: "translateX(-4px)",
          boxShadow: 1,
        },
        "&.Mui-selected": {
          borderColor: "primary.main",
          backgroundColor: "primary.light",
          color: "primary.contrastText",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            border: "2px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.875rem",
            fontWeight: "medium",
            flexShrink: 0,
          }}
        >
          {String.fromCharCode(65 + question.options.indexOf(option))}
        </Box>
        <Typography variant="body1" sx={{ flex: 1 }}>
          {option.text}
        </Typography>
      </Box>
    </Button>
  );
}
