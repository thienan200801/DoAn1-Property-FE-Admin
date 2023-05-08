import { Box, Button, Dialog, DialogContent } from "@mui/material";
import MuiTypography from "@mui/material/Typography";

export default function AlertModal({ content, handleClose, action }) {
  return (
    <Dialog open={true} sx={{ p: 4 }}>
      <DialogContent>
        <MuiTypography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
          {content}
        </MuiTypography>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button onClick={handleClose} color="error" sx={{ mr: 1 }}>
            Huỷ
          </Button>
          <Button type="submit" variant="outlined" onClick={action}>
            Xác nhận
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
