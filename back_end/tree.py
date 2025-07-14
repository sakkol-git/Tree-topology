from typing import List, Optional, Dict, Any

class Node:
    """Represents a device in the tree network topology."""
    def __init__(self, id: int, type: str, name: str, parent_id: Optional[int], status: str):
        self.id = id
        self.type = type
        self.name = name
        self.parent_id = parent_id
        self.status = status
        self.children: List['Node'] = []

    def to_dict(self) -> Dict[str, Any]:
        """Convert node to dictionary for JSON serialization."""
        return {
            "id": self.id,
            "type": self.type,
            "name": self.name,
            "parent_id": self.parent_id,
            "status": self.status,
            "children": [child.to_dict() for child in self.children]
        }

class Tree:
    """Represents the tree network topology."""
    def __init__(self):
        self.nodes: Dict[int, Node] = {}
        self.root: Optional[Node] = None

    def add_node(self, id: int, type: str, name: str, parent_id: Optional[int], status: str) -> bool:
        """Add a new node to the tree."""
        if id in self.nodes:
            return False
        new_node = Node(id, type, name, parent_id, status)
        self.nodes[id] = new_node
        if parent_id is None:
            if self.root is None:
                self.root = new_node
            else:
                return False
        else:
            if parent_id not in self.nodes:
                return False
            self.nodes[parent_id].children.append(new_node)
        return True

    def get_node(self, id: int) -> Optional[Dict[str, Any]]:
        """Retrieve a node by ID."""
        node = self.nodes.get(id)
        return node.to_dict() if node else None

    def update_node(self, id: int, type: Optional[str] = None, name: Optional[str] = None,
                    parent_id: Optional[int] = None, status: Optional[str] = None) -> bool:
        """Update a node's attributes."""
        if id not in self.nodes:
            return False
        node = self.nodes[id]
        if type:
            node.type = type
        if name:
            node.name = name
        if status:
            node.status = status
        if parent_id is not None:
            if parent_id == id or self._has_cycle(id, parent_id):
                return False
            if node.parent_id is not None:
                parent = next((p for p in self.nodes.values() if node in p.children), None)
                if parent:
                    parent.children.remove(node)
            node.parent_id = parent_id
            if parent_id is None:
                self.root = node
            else:
                if parent_id not in self.nodes:
                    return False
                self.nodes[parent_id].children.append(node)
        return True

    def delete_node(self, id: int) -> bool:
        """Delete a node and its subtree."""
        if id not in self.nodes:
            return False
        node = self.nodes[id]
        if node.children:
            for child in node.children[:]:
                self.delete_node(child.id)
        if node.parent_id is not None:
            parent = next((p for p in self.nodes.values() if node in p.children), None)
            if parent:
                parent.children.remove(node)
        if self.root == node:
            self.root = None
        del self.nodes[id]
        return True

    def _has_cycle(self, node_id: int, new_parent_id: int) -> bool:
        """Check for cycles in the tree."""
        visited = set()
        current_id = new_parent_id
        while current_id is not None:
            if current_id == node_id:
                return True
            if current_id in visited:
                return True
            visited.add(current_id)
            current_id = self.nodes[current_id].parent_id if current_id in self.nodes else None
        return False

    def dfs(self) -> List[Dict[str, Any]]:
        """Perform DFS traversal starting from the root."""
        result = []
        if self.root:
            self._dfs_recursive(self.root, result)
        return result

    def _dfs_recursive(self, node: Node, result: List[Dict[str, Any]]):
        """Helper for DFS traversal."""
        result.append(node.to_dict())
        for child in node.children:
            self._dfs_recursive(child, result)

    def bfs(self) -> List[Dict[str, Any]]:
        """Perform BFS traversal starting from the root."""
        result = []
        if not self.root:
            return result
        queue = [self.root]
        while queue:
            node = queue.pop(0)
            result.append(node.to_dict())
            queue.extend(node.children)
        return result

    def search(self, query: str) -> List[Dict[str, Any]]:
        """Search for nodes by ID or name."""
        result = []
        for node in self.nodes.values():
            if str(node.id) == query or query.lower() in node.name.lower():
                result.append(node.to_dict())
        return result

    def get_tree(self) -> Optional[Dict[str, Any]]:
        """Return the entire tree as a dictionary."""
        return self.root.to_dict() if self.root else None
