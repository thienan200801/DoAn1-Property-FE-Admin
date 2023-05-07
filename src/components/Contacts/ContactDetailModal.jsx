import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";

export default function ContactDetailModal({ handleClose, contact }) {
  return (
    <Dialog open={true}>
      <DialogTitle sx={{ fontSize: 20 }}>
        Chi tiết thông tin liên hệ
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontWeight: 700 }}>Họ và tên: </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography>{contact.fullname}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontWeight: 700 }}>Email: </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography>{contact.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontWeight: 700 }}>Số điện thoại: </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography>{contact.phoneNumber}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontWeight: 700 }}>Loại yêu cầu: </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography>{contact.demandType}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontWeight: 700 }}>Thông điệp: </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography>{contact.message}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography sx={{ fontWeight: 700 }}>Ghi chú: </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography>{contact.noteByAdmin}</Typography>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
          <Button onClick={handleClose} color="primary" variant="outlined">
            OK
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
