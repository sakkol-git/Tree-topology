
import json
from typing import List, Dict, Any
from tree import Tree

class Database:
    """Handles JSON file operations for the network topology."""
    def __init__(self, file_path: str):
        self.file_path = file_path

    def load_tree(self, tree: Tree) -> bool:
        """Load tree from JSON file."""
        try:
            with open(self.file_path, 'r') as f:
                devices = json.load(f)
            tree.nodes.clear()
            tree.root = None
            for device in devices:
                tree.add_node(
                    id=device['id'],
                    type=device['type'],
                    name=device['name'],
                    parent_id=device['parent_id'],
                    status=device['status']
                )
            return True
        except Exception as e:
            print(f"Error loading JSON: {e}")
            return False

    def save_tree(self, tree: Tree) -> bool:
        """Save tree to JSON file."""
        try:
            devices = []
            for node in tree.nodes.values():
                devices.append({
                    "id": node.id,
                    "type": node.type,
                    "name": node.name,
                    "parent_id": node.parent_id,
                    "status": node.status
                })
            with open(self.file_path, 'w') as f:
                json.dump(devices, f, indent=2)
            return True
        except Exception as e:
            print(f"Error saving JSON: {e}")
            return False
