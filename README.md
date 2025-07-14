# Tree-topology

# remote content from GitHub

# Tree Network Topology Project

This project simulates a university's tree network topology with 13 devices (1 router, 3 hubs/switches, 9 computers). It demonstrates data structure and algorithm concepts using a JSON database, Python/Flask backend, and React/TypeScript/Bootstrap frontend.

## Project Structure

tree-network-project/├── backend/│ ├── tree.py│ ├── database.py│ ├── utils.py│ ├── main.py│ └── network.json├── frontend/│ ├── src/│ │ ├── App.tsx│ │ ├── components/│ │ ├── types/│ │ ├── services/│ ├── package.json│ └── tsconfig.json├── README.md└── requirements.txt

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

Create a virtual environment and activate it:python -m venv venv
source venv/bin/activate # On Windows: venv\Scripts\activate

Install dependencies:pip install -r requirements.txt

Run the Flask server:python main.py

The API will be available at http://localhost:5000.

Frontend Setup

Navigate to the frontend directory:cd frontend

Install dependencies:npm install

Start the React development server:npm start

The frontend will be available at http://localhost:3000.

API Documentation

GET /devices: Retrieve the entire network topology or a specific device (?id=<id>).
POST /devices: Add a new device (JSON body with id, type, name, parent_id, status).
PUT /devices/: Update a device’s attributes.
DELETE /devices/: Delete a device.
GET /traverse/: Perform DFS or BFS traversal (method=dfs or method=bfs).
GET /search?query=: Search devices by ID or name.

Usage Scenarios

Visualize Network: View the tree topology in the frontend.
Manage Devices: Add, edit, or delete devices using the form and device list.
Traverse Network: Use DFS or BFS to explore the network hierarchy.
Search Devices: Find devices by ID or name.

Testing

Backend: Run pytest in the backend directory for unit tests.
API: Test endpoints using Postman or curl.
Frontend: Ensure error messages are displayed for failed operations.

Notes

The project is optimized for a small scale (13 devices) but can be extended.
Error handling is implemented for invalid inputs and edge cases.
The frontend is responsive and uses Bootstrap for styling.
