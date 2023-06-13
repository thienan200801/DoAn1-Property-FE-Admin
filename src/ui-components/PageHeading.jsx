import { useTheme } from "@emotion/react";
import { Typography, useMediaQuery } from "@mui/material";

export default function PageHeading({ content }) {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Typography
      variant={matchDownMd ? "h5" : "h4"}
      gutterBottom
      sx={{ mb: "0px" }}
    >
      {content}
    </Typography>
  );
}
