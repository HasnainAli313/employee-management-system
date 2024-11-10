
import { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';

const EmployeeList = () => {
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
    setEmployees(storedEmployees);
  }, []);

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const handleOpen = (index = null) => {
    if (index !== null) {
      setCurrentEmployee(employees[index]);
      setEditIndex(index);
    } else {
      setCurrentEmployee({
        name: '',
        email: '',
        role: '',
        department: '',
        salary: '',
        task: '',
        deadline: '',
        status: ''
      });
      setEditIndex(null);
    }
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
    } else {
      setEmployees([...employees, currentEmployee]);
    }
    handleClose();
  };

  const handleDelete = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Employee
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
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
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>{employee.task}</TableCell>
                <TableCell>{employee.deadline}</TableCell>
                <TableCell>{employee.status}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(index)}>Edit</Button>
                  <Button onClick={() => handleDelete(index)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex !== null ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={currentEmployee.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={currentEmployee.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="role"
            label="Role"
            type="text"
            fullWidth
            value={currentEmployee.role}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="department"
            label="Department"
            type="text"
            fullWidth
            value={currentEmployee.department}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="salary"
            label="Salary"
            type="number"
            fullWidth
            value={currentEmployee.salary}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="task"
            label="Task"
            type="text"
            fullWidth
            value={currentEmployee.task}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="deadline"
            label="Deadline"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={currentEmployee.deadline}
            onChange={handleChange}
          />
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
    </div>
  );
};

export default EmployeeList;
