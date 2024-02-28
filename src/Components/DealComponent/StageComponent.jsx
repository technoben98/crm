import React from "react";
import { useDrop } from "react-dnd";
import ObjectComponent from "./ObjectComponent";

const StageComponent = ({ name, objects, onDrop }) => {
  const [, drop] = useDrop({
    accept: "OBJECT",
    drop: (item) => {
      onDrop(item.id, name);
    },
  });

  return (
    <div
      ref={drop}
      style={{
        border: "1px solid #000",
        margin: "4px",
        padding: "8px",
        height: "85vh",
        overflowY: "auto",
      }}
    >
      <div>{name}</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {objects
          .filter((obj) => obj.status === name)
          .map((obj) => (
            <ObjectComponent
              key={obj.id}
              id={obj.id}
              name={obj.name}
              status={obj.status}
              campus={obj.campus}
            />
          ))}
      </div>
    </div>
  );
};

export default StageComponent;
