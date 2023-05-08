import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "4rem",
      }}
    >
      <CircularProgress />
    </div>
  );
}
