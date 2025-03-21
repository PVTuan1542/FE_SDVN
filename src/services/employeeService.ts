
import axiosInstance from ".";
import { baseUrl } from "../const/api";
import { Employees } from "../types/employee";

interface GetInfoEmployeeParams {
  id?: number;
}

const getAllEmployees = async (): Promise<Employees[]> => {
  try {
    const response = await axiosInstance.get(baseUrl + '/employees');
    console.log("response", response);
    return response.data;
  }
  catch (error) {
    console.error("Error fetching employees", error);
    throw new Error('Failed to fetch employees');
  }
}

const addEmployee = async (employee: Employees): Promise<Employees> => {
  try {
    const response = await axiosInstance.post(`${baseUrl}/employees`, employee);
    return response.data;
  } catch (error) {
    console.error("Error adding employees", error);
    throw new Error('Failed to add employees');
  }
}

const getOneEmployee = async (id: number): Promise<Employees> => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/employees/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error get one employees", error);
    throw new Error('Failed to get one employees');
  }
}

const updateEmployee = async (id: number, employee: Employees): Promise<Employees> => {
  try {
    const response = await axiosInstance.put(`${baseUrl}/employees/${id}`, employee);
    return response.data;
  } catch (error) {
    console.error("Error update employees", error);
    throw new Error('Failed to update employees');
  }
}

const deleteEmployee = async (id: number): Promise<Employees> => {
  try {
    const response = await axiosInstance.delete(`${baseUrl}/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error delete employees", error);
    throw new Error('Failed to delete employees');
  }
}

export default {
  getAllEmployees,
  addEmployee,
  getOneEmployee,
  updateEmployee,
  deleteEmployee
}