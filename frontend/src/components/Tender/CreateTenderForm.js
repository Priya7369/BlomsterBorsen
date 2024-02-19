import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { API_URL } from "../../services/apiConfig";

const CreateTenderForm = ({ isOpen, onClose, accessToken }) => {
  const [newTender, setNewTender] = useState({
    tender_type: "",
    description: "",
  });

  const handleCreateTender = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tender`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newTender),
      });

      if (response.status === 201) {
        // If the request was successful, you can handle the response or perform additional actions
        const responseData = await response.json();
        console.log("Tender created:", responseData);

        // Close the dialog or perform any other necessary actions
        onClose();
      } else {
        // Handle the case where the API request was not successful
        console.error("Failed to create tender. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error creating tender:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Tender</DialogTitle>
      <DialogContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              label="Tender Type"
              value={newTender.tender_type}
              onChange={(e) =>
                setNewTender({ ...newTender, tender_type: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              label="Description"
              value={newTender.description}
              onChange={(e) =>
                setNewTender({ ...newTender, description: e.target.value })
              }
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleCreateTender}
          color="primary"
          variant="contained"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTenderForm;
