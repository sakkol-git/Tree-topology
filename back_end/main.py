from flask import Flask, request, jsonify
from flask_cors import CORS
from tree import Tree
from database import Database
from utils import validate_device

app = Flask(__name__)
CORS(app)
tree = Tree()
db = Database('network.json')

# Load initial data
db.load_tree(tree)

@app.route('/devices', methods=['GET'])
def get_devices():
    """Get the root node (tree) for visualization."""
    return jsonify(tree.get_tree() or {}), 200

@app.route('/devices/list', methods=['GET'])
def get_devices_list():
    """Get all devices as a flat list."""
    return jsonify([n.to_dict() for n in tree.nodes.values()]), 200

@app.route('/devices', methods=['POST'])
def add_device():
    """Add a new device."""
    data = request.get_json()
    if not validate_device(data):
        return jsonify({"error": "Invalid device data"}), 400
    success = tree.add_node(
        id=data['id'],
        type=data['type'],
        name=data['name'],
        parent_id=data.get('parent_id'),
        status=data['status']
    )
    if success:
        db.save_tree(tree)
        return jsonify({"message": "Device added"}), 201
    return jsonify({"error": "Failed to add device"}), 400

@app.route('/devices/<int:id>', methods=['PUT'])
def update_device(id):
    """Update a device's attributes."""
    data = request.get_json()
    success = tree.update_node(
        id=id,
        type=data.get('type'),
        name=data.get('name'),
        parent_id=data.get('parent_id'),
        status=data.get('status')
    )
    if success:
        db.save_tree(tree)
        return jsonify({"message": "Device updated"})
    return jsonify({"error": "Failed to update device"}), 400

@app.route('/devices/<int:id>', methods=['DELETE'])
def delete_device(id):
    """Delete a device."""
    success = tree.delete_node(id)
    if success:
        db.save_tree(tree)
        return jsonify({"message": "Device deleted"})
    return jsonify({"error": "Device not found"}), 404

@app.route('/traverse/<method>', methods=['GET'])
def traverse(method):
    """Perform DFS or BFS traversal."""
    if method.lower() not in ['dfs', 'bfs']:
        return jsonify({"error": "Invalid traversal method"}), 400
    result = tree.dfs() if method.lower() == 'dfs' else tree.bfs()
    return jsonify(result)

@app.route('/search', methods=['GET'])
def search():
    """Search devices by ID or name."""
    query = request.args.get('query', '')
    if not query:
        return jsonify({"error": "Query parameter required"}), 400
    return jsonify(tree.search(query))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
