import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import StageComponent from "./StageComponent";
import DealStageDB from "../../source/DealStageDB.json";
import LeadsDB from "../../source/LeadsDB.json";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Select } from "@mui/material";

const DragAndDropPage = () => {
  const [objects, setObjects] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const [newStatus, setNewStatus] = useState(null);

  useEffect(() => {
    const loadedObjects = LeadsDB.filter(
      (lead) => lead["Lead Status"] === "In progress"
    ).map((lead) => ({
      id: lead.id,
      name: lead["Full Name"],
      status: lead["Deal"],
      campus: lead["Campus"],
    }));
    setObjects(loadedObjects);
  }, []);

  const handleDrop = (objectId, newStatus) => {
    const draggedObject = objects.find((obj) => obj.id === objectId);

    setSelectedObject(draggedObject);
    setNewStatus(newStatus);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleConfirmMove = () => {
    const updatedObjects = objects.map((obj) =>
      obj.id === selectedObject.id ? { ...obj, status: newStatus } : obj
    );
    setObjects(updatedObjects);
    setDialogOpen(false);
  };

  const getObjectCountByStatus = (status) => {
    return objects.filter((obj) => obj.status === status).length;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Select></Select>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {DealStageDB.map((stageName) => (
          <div key={stageName} style={{ width: "13%" }}>
            <StageComponent
              name={stageName}
              objects={objects.filter((obj) => obj.status === stageName)}
              onDrop={handleDrop}
            />

            <div style={{ textAlign: "center", marginTop: "10px" }}>
              Total leads: {getObjectCountByStatus(stageName)}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure to move "${selectedObject?.name}" to "${newStatus}"?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button color="success" onClick={handleConfirmMove}>
            Move
          </Button>
        </DialogActions>
      </Dialog>
    </DndProvider>
  );
};

export default DragAndDropPage;
