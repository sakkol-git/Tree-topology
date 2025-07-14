export interface Device {
  id: number;
  type: string;
  name: string;
  parent_id: number | null;
  status: string;
  children?: Device[];
}