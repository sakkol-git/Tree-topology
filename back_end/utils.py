from typing import Dict, Any

def validate_device(device: Dict[str, Any]) -> bool:
    """Validate device data."""
    required_fields = ['id', 'type', 'name', 'status']
    if not all(field in device for field in required_fields):
        return False
    if device['type'] not in ['router', 'hub', 'switch', 'computer']:
        return False
    if device['status'] not in ['active', 'inactive']:
        return False
    return True