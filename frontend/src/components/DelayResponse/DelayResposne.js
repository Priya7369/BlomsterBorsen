import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  CircularProgress,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { API_URL } from "../../services/apiConfig";
import { getAccessToken } from "../../services/jwtService";

const DelayResponse = () => {
  const [delay, setDelay] = useState(0);
  const [requests, setRequests] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [expectedTime, setExpectedTime] = useState(0);

  const accessToken = getAccessToken();

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const makeRequest = async () => {
    const requestId = uuidv4();
    try {
      handleClose();
      const startTime = new Date().getTime();
      const requestDelay = parseInt(delay, 10);

      const newRequest = {
        requestId,
        startTime,
        loading: true,
        delay: requestDelay,
      };

      setRequests((prevRequests) => [...prevRequests, newRequest]);

      const response = await fetch(
        `${API_URL}/api/delayed-response?delay=${requestDelay}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const responseData = await response.json();
      const endTime = new Date().getTime();
      const elapsed = (endTime - startTime) / 1000;

      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.requestId === requestId
            ? {
                ...req,
                loading: false,
                response: responseData.message,
                elapsed,
              }
            : req
        )
      );

      // Update expected time by summing up all pending requests' delays
      const pendingRequests = requests.filter((req) => req.loading);
      const totalPendingDelay = pendingRequests.reduce(
        (total, req) => total + req.delay,
        0
      );
      setExpectedTime(totalPendingDelay);
    } catch (error) {
      console.error("Error making request:", error);
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.requestId === requestId
            ? {
                ...req,
                loading: false,
                response: "Error",
              }
            : req
        )
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();

      // Update expected time by summing up all pending requests' delays
      const pendingRequests = requests.filter((req) => req.loading);
      const totalPendingDelay = pendingRequests.reduce(
        (total, req) => total + req.delay,
        0
      );
      setExpectedTime(totalPendingDelay);

      // No need to filter out completed requests
    }, 1000);
    return () => clearInterval(interval);
  }, [requests]);

  return (
    <div>
      <Grid container spacing={2} sx={{ padding: "10px" }}>
        <Grid item xs={6}>
          <Typography variant="h4">Delayed API</Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "right" }}>
          <Button variant="contained" onClick={handleClickOpen}>
            Set Delay
          </Button>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Set Delay (in seconds)</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="delay"
              label="Delay (seconds)"
              type="number"
              value={delay}
              onChange={(e) => setDelay(e.target.value)}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={makeRequest}>Submit</Button>
        </DialogActions>
      </Dialog>

      <div>
        <Typography variant="h2">Requests:</Typography>
        <Typography variant="h6">
          Expected Time for Response: {expectedTime} seconds
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Request ID</TableCell>
                <TableCell>Request API</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>Response Message</TableCell>
                <TableCell>Elapsed Time (seconds)</TableCell>
                <TableCell>Delay (seconds)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((req, index) => (
                <TableRow key={index}>
                  <TableCell>{req.requestId}</TableCell>
                  <TableCell>{`${API_URL}/api/delayed-response?delay=${req.delay}`}</TableCell>
                  <TableCell>
                    {new Date(req.startTime).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>
                    {req.loading ? (
                      <CircularProgress size={20} />
                    ) : (
                      req.response || ""
                    )}
                  </TableCell>
                  <TableCell>{req.elapsed || ""}</TableCell>
                  <TableCell>{req.delay}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default DelayResponse;
