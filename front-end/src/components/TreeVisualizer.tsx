import React from "react";
import Tree from "react-d3-tree";
import { Device } from "../types/types";

interface TreeVisualizerProps {
  tree: Device | null;
}

const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ tree }) => {
  if (!tree) return <div>No tree data available</div>;

  const renderNode = ({ nodeDatum }: any) => {
    // If your tree data is guaranteed to have Device properties, you can cast:
    const device = nodeDatum as Device;
    return (
      <g>
        <circle
          r="15"
          fill={device.status === "active" ? "#28a745" : "#dc3545"}
        />
        <text fill="black" strokeWidth="0" x="20" y="-10">
          {" "}
          id {" : "}
          {device.id}
        </text>
        <text fill="black" strokeWidth="0" x="20" y="10">
          {device.name}
        </text>
      </g>
    );
  };

  return (
    <div className="tree-container">
      <Tree
        data={tree}
        orientation="vertical"
        translate={{ x: 200, y: 50 }}
        zoomable
        renderCustomNodeElement={renderNode}
      />
    </div>
  );
};

export default TreeVisualizer;
