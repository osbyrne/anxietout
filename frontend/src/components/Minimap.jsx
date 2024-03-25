import React from "react";

const Minimap = ({ x, y }) => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <img
        src="/room_plan.jpg"
        alt="item map"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <img
        src="/red_dot.png"
        alt="item point"
        style={{
          position: "absolute",
          width: "10px",
          height: "10px",
          top: `${y}px`,
          left: `${x}px`,
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export { Minimap };
