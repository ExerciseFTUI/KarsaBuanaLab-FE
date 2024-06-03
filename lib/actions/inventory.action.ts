"use server";

import {
  Inventory,
  InventoryUser,
} from "@/components/auth/inventory/InventoryType";
import axios from "axios";

const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:5000";

export const getInventoryUsers = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/inventory/get-users`);
    return response.data.users as InventoryUser[];
  } catch (error: any) {
    console.log(error.response.data);
    console.error(`Error getting inventory users :`, error.message);
    return [];
  }
};

export const getAllInventory = async () => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/inventory/get-all-inventory`
    );
    return response.data.items as Inventory[];
  } catch (error: any) {
    console.log(error.response.data);
    console.error(`Error getting all inventory :`, error.message);
    return [];
  }
};

export const getInventoryById = async (id: string) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/inventory/get-inventory-by-id/${id}`
    );
    return response.data as Inventory;
  } catch (error: any) {
    console.log(error.response.data);
    console.error(`Error getting single inventory :`, error.message);
    return {} as Inventory;
  }
};

type createInventoryRequest = {
  tools_name: string;
  description: string;
  last_maintenance: string | undefined;
  maintenance_every: string;
  assigned_user: string[];
  category: string;
};

export const createInventory = async (body: createInventoryRequest) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/inventory/create-inventory`,
      body
    );

    return true;
  } catch (error: any) {
    console.log(error.response.data);
    console.error(`Error creating inventory :`, error.message);
    return false;
  }
};

type updateInventoryRequest = {
  id: string;
  updates: createInventoryRequest;
};

export const updateInventory = async (body: updateInventoryRequest) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/inventory/update-inventory`,
      body
    );

    return true;
  } catch (error: any) {
    console.log(error.response.data);
    console.error(`Error updating inventory :`, error.message);
    return false;
  }
};
