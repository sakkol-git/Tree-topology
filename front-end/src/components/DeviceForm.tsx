import React, { useState } from "react";
import { addDevice } from "../services/api";
import { Device } from "../types/types";

interface DeviceFormProps {
  onDeviceAdded: () => void;
}

const DeviceForm: React.FC<DeviceFormProps> = ({ onDeviceAdded }) => {
  const [device, setDevice] = useState<Omit<Device, "children">>({
    id: 0,
    type: "computer",
    name: "",
    parent_id: null,
    status: "active",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDevice(device);
      onDeviceAdded();
      setDevice({
        id: 0,
        type: "computer",
        name: "",
        parent_id: null,
        status: "active",
      });
    } catch (error) {
      console.error("Error adding device:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "id") {
      setDevice({ ...device, id: Number(value) });
    } else if (name === "parent_id") {
      setDevice({ ...device, parent_id: value === "" ? 1 : Number(value) });
    } else {
      setDevice({ ...device, [name]: value });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h3>Add Device</h3>
      <div className="mb-3">
        <label className="form-label">ID</label>
        <input
          type="number"
          name="id"
          className="form-control"
          value={device.id}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Type</label>
        <select
          name="type"
          className="form-control"
          value={device.type}
          onChange={handleChange}
          required
        >
          <option value="computer">Computer</option>
          <option value="router">Router</option>
          <option value="hub">Hub</option>
          <option value="switch">Switch</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={device.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Parent ID (optional)</label>
        <input
          type="number"
          name="parent_id"
          className="form-control"
          value={device.parent_id ?? ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Status</label>
        <select
          name="status"
          className="form-control"
          value={device.status}
          onChange={handleChange}
          required
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Add Device
      </button>
    </form>
  );
};

export default DeviceForm;
