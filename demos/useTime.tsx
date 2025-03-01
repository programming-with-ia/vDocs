import React from "react";
import useTime from "./useTime";

const Demo: React.FC = () => {
  const time = useTime({ interval: 1000 });

  return (
    <div style={{ fontFamily: "monospace", fontSize: "24px" }}>
      Current Time: {time.toLocaleTimeString()}
    </div>
  );
};

export default Demo;
