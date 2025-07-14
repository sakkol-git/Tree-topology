import axios from 'axios';
import { Device } from '../types/types';

const API_URL = 'http://localhost:5001';

export const getDevices = async (): Promise<Device> => {
  const response = await axios.get(`${API_URL}/devices`);
  return response.data;
};

export const getDevice = async (id: number): Promise<Device> => {
  const response = await axios.get(`${API_URL}/devices?id=${id}`);
  return response.data;
};

export const addDevice = async (device: Omit<Device, 'children'>): Promise<void> => {
  await axios.post(`${API_URL}/devices`, device);
};

export const updateDevice = async (id: number, device: Partial<Device>): Promise<void> => {
  await axios.put(`${API_URL}/devices/${id}`, device);
};

export const deleteDevice = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/devices/${id}`);
};

export const traverse = async (method: 'dfs' | 'bfs'): Promise<Device[]> => {
  const response = await axios.get(`${API_URL}/traverse/${method}`);
  return response.data;
};

export const searchDevices = async (query: string): Promise<Device[]> => {
  const response = await axios.get(`${API_URL}/search?query=${query}`);
  return response.data;
};