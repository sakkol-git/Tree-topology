import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TreeVisualizer from "./components/TreeVisualizer";
import DeviceForm from "./components/DeviceForm";
import DeviceList from "./components/DeviceList";
import { Device } from "./types/types";
import { getDevices, traverse, searchDevices } from "./services/api";
import "./App.css";

const App: React.FC = () => {
  const [tree, setTree] = useState<Device | null>(null);
  const [traversalResult, setTraversalResult] = useState<Device[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchTree();
  }, []);

  const fetchTree = async () => {
    try {
      const data = await getDevices();
      setTree(data);
    } catch (error) {
      console.error("Error fetching tree:", error);
    }
  };

  const handleTraverse = async (method: "dfs" | "bfs") => {
    try {
      const result = await traverse(method);
      setTraversalResult(result);
    } catch (error) {
      console.error("Error traversing:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const result = await searchDevices(searchQuery);
      setTraversalResult(result);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <div>
      <img src="/tree.png" alt="Tree Network Logo" className="logo" />
      <h1 className="mb-5 title">Tree Network Topology Management</h1>
      <div className="row">
        <div className="col-md-8 mb-5">
          <TreeVisualizer tree={tree} />
        </div>
        <div className="col-md-4">
          <DeviceForm onDeviceAdded={fetchTree} />
          <div className="my-4">
            <h3>Traversal</h3>
            <button
              className="btn btn-primary me-5 "
              onClick={() => handleTraverse("dfs")}
            >
              DFS
            </button>
            <button
              className="btn btn-primary "
              onClick={() => handleTraverse("bfs")}
            >
              BFS
            </button>
          </div>
        </div>
        <div className="my-4">
          <h3>Search</h3>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID or name"
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
          <DeviceList
            devices={traversalResult}
            onDeviceUpdated={fetchTree}
            onDeviceDeleted={fetchTree}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
