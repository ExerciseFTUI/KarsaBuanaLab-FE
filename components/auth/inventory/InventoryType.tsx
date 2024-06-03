export type Inventory = {
  _id: string;
  tools_name: string;
  description: string;
  last_maintenance: string;
  maintenance_history: any[]; // Assuming maintenance_history is of any type
  maintenance_every: string;
  assigned_user: string[];
  category: string;
  assigned_users: InventoryUser[];
  deadline: string;
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
