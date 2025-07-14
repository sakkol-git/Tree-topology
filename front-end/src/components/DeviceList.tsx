import React, { useState, useEffect } from "react";
import { Device } from "../types/types";
import { updateDevice, deleteDevice } from "../services/api";

interface DeviceListProps {
  devices: Device[];
  onDeviceUpdated: () => void;
  onDeviceDeleted: () => void;
}

const DeviceList: React.FC<DeviceListProps> = ({
  devices,
  onDeviceUpdated,
  onDeviceDeleted,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Device>>({});
  const [localDevices, setLocalDevices] = useState<Device[]>(devices);

  // Sync localDevices with props.devices when devices change
  useEffect(() => {
    setLocalDevices(devices);
  }, [devices]);

  const handleEdit = (device: Device) => {
    setEditingId(device.id);
    setEditForm(device);
  };

  const handleUpdate = async (id: number) => {
    try {
      await updateDevice(id, editForm);
      setLocalDevices((prev) =>
        prev.map((d) => (d.id === id ? { ...d, ...editForm } : d))
      );
      setEditingId(null);
      onDeviceUpdated(); // fetch latest data from backend if needed
    } catch (error) {
      console.error("Error updating device:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteDevice(id);
      setLocalDevices((prev) => prev.filter((d) => d.id !== id));
      onDeviceDeleted(); // fetch latest data from backend if needed
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  return (
    <div>
      <h3>Devices</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Parent ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {localDevices.map((device) => (
            <tr key={device.id}>
              {editingId === device.id ? (
                <>
                  <td>{device.id}</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={editForm.name || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <select
                      className="form-control"
                      value={editForm.type || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, type: e.target.value })
                      }
                    >
                      <option value="router">Router</option>
                      <option value="switch">Switch</option>
                      <option value="hub">Hub</option>
                      <option value="computer">Computer</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={editForm.parent_id ?? ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          parent_id: e.target.value
                            ? parseInt(e.target.value)
                            : null,
                        })
                      }
                    />
                  </td>
                  <td>
                    <select
                      className="form-control"
                      value={editForm.status || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, status: e.target.value })
                      }
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => handleUpdate(device.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{device.id}</td>
                  <td>{device.name}</td>
                  <td>{device.type}</td>
                  <td>{device.parent_id ?? "None"}</td>
                  <td>{device.status}</td>
                  <td>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleEdit(device)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(device.id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceList;
