import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import { API_URL } from "../../services/apiConfig";
import CreateTenderForm from "./CreateTenderForm";
import { makeStyles } from "@mui/styles";
import { getRole, getAccessToken } from "../../services/jwtService";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

// Styles for the table and loader
const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginTop: theme.spacing(2),
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  tableRow: {
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  loaderContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  // Add a new class for the grid container
  buttonContainer: {
    textAlign: "right",
  },
}));

// Functional component
const Tender = () => {
  const role = getRole();
  const accessToken = getAccessToken();

  const classes = useStyles();
  const [tenders, setTenders] = useState([]);
  const [isCreateTenderModalOpen, setIsCreateTenderModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTenders = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/tender`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch tenders: ${response.status}`);
      }

      const data = await response.json();
      setTenders(data);
    } catch (error) {
      console.error("Error fetching tenders:", error);
      setError("Failed to fetch tenders. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchTenders();
  }, [fetchTenders]);

  const handleCreateTender = () => {
    setIsCreateTenderModalOpen(true);
  };

  return (
    <div>
      <Grid container spacing={2} sx={{ padding: "20px" }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4">Tenders</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.buttonContainer}>
          {role === "Forest Owner" && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateTender}
            >
              Create Tender
            </Button>
          )}
        </Grid>
      </Grid>

      {isLoading ? (
        <div className={classes.loaderContainer}>
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : tenders.length === 0 ? (
        <Typography variant="body1">No data</Typography>
      ) : (
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table>
            <TableHead>
              <TableRow className={classes.tableHead}>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tenders.map((tender) => (
                <TableRow key={tender.id} className={classes.tableRow}>
                  <TableCell>{tender.id}</TableCell>
                  <TableCell>{tender.title}</TableCell>
                  <TableCell>{tender.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <CreateTenderForm
        isOpen={isCreateTenderModalOpen}
        onClose={() => {
          setIsCreateTenderModalOpen(false);
          fetchTenders();
        }}
        accessToken={accessToken}
      />
    </div>
  );
};

const App = () => (
  <ThemeProvider theme={theme}>
    <Tender role="Forest Owner" />
  </ThemeProvider>
);

export default App;
