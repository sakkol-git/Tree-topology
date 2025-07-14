# Tree Network Topology (React + Vite + TypeScript)

## Overview

This project visualizes and manages a university tree network topology (router, hubs/switches, computers) using a Python Flask backend and a React + TypeScript + Vite frontend.

## Setup

### Backend

1. Go to `back_end/` directory.
2. Install dependencies:
   ```sh
   pip install flask
   ```
3. Run the backend:
   ```sh
   python main.py
   ```
   The API will be available at http://localhost:5000

### Frontend

1. Go to `front-end/` directory.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   The app will be available at http://localhost:5173

## Features

- Visualize the network as a tree (using react-d3-tree)
- Add, update, delete devices
- Traverse (DFS/BFS) and search devices
- Responsive UI with Bootstrap

## API Endpoints

- `GET /devices` — Get the root node (tree)
- `GET /devices/list` — Get all devices as a flat list
- `POST /devices` — Add a device
- `PUT /devices/<id>` — Update a device
- `DELETE /devices/<id>` — Delete a device
- `GET /traverse/<method>` — Traverse the tree (dfs/bfs)
- `GET /search?query=...` — Search by ID or name

## Notes

- Make sure the backend is running before starting the frontend.
- The frontend expects the `/devices` endpoint to return the root node with children for tree visualization.
- For any issues, check the browser console and backend logs.
