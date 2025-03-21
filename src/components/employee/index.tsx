import { useCallback, useEffect, useState } from "react";
import { Employees } from "../../types/employee";
import employeeService from "../../services/employeeService";
import "./index.css";
import { useNavigate } from "react-router-dom";

export const Index: React.FC = () => {
  const [data, setData] = useState<Employees[]>();
  const navigate = useNavigate();

  const getEmployees = useCallback(async () => {
    const data = await employeeService.getAllEmployees();

    setData(data);
  }, [])

  useEffect(() => {
    getEmployees()
  }, []);

  return (
    <>
      <div className="table-container">
        <button className="create-button" onClick={() => navigate("/employees/create")}>
          + Create Employee
        </button>
        <table className="table">
          <thead>
            <tr >
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {data && data?.map((employee) => (
              <tr key={employee?.id} onClick={() => navigate(`/employees/edit/${employee.id}`)}>
                <td>{employee?.id}</td>
                <td>{employee?.name}</td>
                <td>{employee?.email}</td>
                <td>{employee?.position}</td>
                <td>{employee?.salary}</td>
                <td>{employee?.department}</td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Index;