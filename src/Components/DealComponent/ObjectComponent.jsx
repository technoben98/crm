import React from "react";
import { useDrag } from "react-dnd";

const ObjectComponent = ({ id, name, status, campus, onStatusChange }) => {
  const [, drag] = useDrag({
    type: "OBJECT",
    item: { id, status, campus },
  });

  return (
    <div
      ref={drag}
      style={{ border: "1px solid #000", margin: "4px", padding: "8px" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{name}</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              backgroundColor: "red",
              width: "10px",
              height: "10px",
              borderRadius: "50px",
            }}
          ></div>
          High
        </div>
      </div>
      <div>Status: {status}</div>
      <div>Campus: {campus}</div>
      <div>Year: 2024</div>
      <div>Cohort: Any</div>
      <div>IIA Program: Any</div>
    </div>
  );
};

export default ObjectComponent;
