import React, { useEffect, useState } from "react";
import employeeService from "../../../services/employeeService";
import "./edit.css";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Employees } from "../../../types/employee";

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Employees>({
    id: 0,
    name: "",
    email: "",
    position: "",
    salary: 0,
    department: "",
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await employeeService.getOneEmployee(Number(id)); // Gọi API lấy nhân viên theo ID
        setFormData(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu nhân viên:", error);
      }
    };

    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const { id, ...newFormData } = formData;

      if (id) {
        await employeeService.updateEmployee(id, newFormData);
      }

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
      id: 0,
      name: "",
      email: "",
      position: "",
      salary: 0,
      department: "",
    });
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      try {
        await employeeService.deleteEmployee(id);

        toast.success("Delete success!", {
          position: "top-right",
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <h2>Add New Employee</h2>
      <div className="form-group">
        <label>ID:</label>
        <input type="text" name="id" value={formData.id} onChange={handleChange} disabled />
      </div>
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
      <button type="submit">Edit Employee</button>
      <button type="button" onClick={() => handleDelete(Number(id))} style={{ marginLeft: "10px", background: "red" }}>Delete</button>
    </form>
  );
};

export default EmployeeForm;
