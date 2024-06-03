export type Inventory = {
  _id: string;
  tools_name: string;
  description: string;
  last_maintenance: string;
  maintenance_history: any[];
  maintenance_every: string;
  assigned_user: string[];
  category: string;
  assigned_users: InventoryUser[];
  deadline: string;
  inventory_file: InventoryFile[];
};

export type InventoryUser = {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  __v: number;
};

export type InventoryFile = {
  file_name: string;
  file_type: string;
  file_id: string;
  file_extension: string;
  _id: string;
};
