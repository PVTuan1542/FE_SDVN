import React, { useEffect, useState } from "react";
import employeeService from "../../../services/employeeService";
import "./create.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Employees } from "../../../types/employee";

const EmployeeFormCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Employees>({
    name: "",
    email: "",
    position: "",
    salary: 0,
    department: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const { id, ...newFormData } = formData;

      await employeeService.addEmployee(newFormData);

      toast.success("Create success!", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      toast.error("Erorr");
    }

    setFormData({
      name: "",
      email: "",
      position: "",
      salary: 0,
      department: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <h2>Add New Employee</h2>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Position:</label>
        <input type="text" name="position" value={formData.position} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Salary:</label>
        <input type="number" name="salary" value={formData.salary} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Department:</label>
        <input type="text" name="department" value={formData.department} onChange={handleChange} required />
      </div>
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default EmployeeFormCreate;
