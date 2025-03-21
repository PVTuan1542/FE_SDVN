import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import EmployeeEdit from '../pages/Employees';
import EmployeeFormCreate from '../pages/EmployeesCreate';


const Home = React.lazy(() => import('../pages/Home'));

const router = createBrowserRouter([
  {
    path: '/home',
    element:
      <Home />
  },
  {
    path: '/employees/edit/:id',
    element:
      <EmployeeEdit />
  },
  {
    path: '/',
    element:
      <Home />
  },
  {
    path: '/employees/create',
    element:
      <EmployeeFormCreate />
  },
]);

export default router;
