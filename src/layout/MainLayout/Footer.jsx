import { Paper, Typography, useTheme } from "@mui/material";

export default function Footer() {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        bgcolor: theme.palette.grey[900],
        display: "flex",
        justifyContent: "center",
        borderRadius: "0px",
        gap: "4px",
        py: "16px",
      }}
    ></Paper>
  );
}
