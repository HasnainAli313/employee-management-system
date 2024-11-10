
    
import { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
  Typography, Box
} from '@mui/material';

const EmployeeDashboard = () => {
  const email = localStorage.getItem('email');

  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    salary: '',
    task: '',
    deadline: '',
    status: ''
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees.filter(emp => emp.email === email));
  }, [email]);

  const handleOpen = (index) => {
    setCurrentEmployee(employees[index]);
    setEditIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee({ ...currentEmployee, [name]: value });
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updatedEmployees = [...employees];
      updatedEmployees[editIndex] = currentEmployee;
      setEmployees(updatedEmployees);

      const allEmployees = JSON.parse(localStorage.getItem('employees')) || [];
      const updatedAllEmployees = allEmployees.map(emp => 
        emp.email === email ? currentEmployee : emp
      );
      localStorage.setItem('employees', JSON.stringify(updatedAllEmployees));
    }
    handleClose();
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Your Dashboard
      </Typography>
      {email && <Typography variant="subtitle1">User: {email}</Typography>}

      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Task</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>{employee.task}</TableCell>
                <TableCell>{employee.deadline}</TableCell>
                <TableCell>{employee.status}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(index)}>Update Status</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Task Status</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="status"
            label="Status"
            type="text"
            fullWidth
            value={currentEmployee.status}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeDashboard;
