import {
  Button,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  TextField,
  Select,
  MenuItem,
} from "@mui/material"
import React, { useState } from "react"
import { useAuth } from "../context/AuthContext"
import papaparse from "papaparse"
import { createEmployee } from "../services/employee"
import TheModal from "./../components/TheModal"
import { getAllDepartments } from "../services/department"

function AddEmployee() {
  const [employees, setEmployees] = useState([])
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    address: "",
    jobTitle: "",
    department: "",
  })
  const [modal, setModal] = useState(false)
  const { headers } = useAuth()

  const handleOnChange = (event) => {
    console.log(event.target.files[0])
    console.log(event.files)
    const reader = new FileReader()
    papaparse.parse(event.target.files[0], {
      header: true,
      newline: "\n",
      complete: getCotentFile,
    })
  }

  const getCotentFile = (res) => {
    const { data, err } = res
    console.log("data")
    console.log(data)
    console.log(err)
    setEmployees(data)
  }

  const selectFile = () => {
    const input = document.getElementById("file")
    input.click()
  }
  const saveEmployee = async (data) => {
    try {
      await createEmployee(data, headers)
      setEmployees([])
    } catch (e) {
      console.log(e)
    }
  }

  const save = async () => {
    try {
      awa
    } catch (e) {}
  }

  const handleAdd = async () => {
    setModal(true)
    const departments = await getAllDepartments(headers)
  }

  return (
    <>
      <Button onClick={() => selectFile()}>
        Upload file
        <input
          id="file"
          type="file"
          hidden
          onChange={(e) => handleOnChange(e)}
        />
      </Button>
      <Button onClick={handleAdd}>Add</Button>
      {employees.length ? (
        <>
          <Button
            style={{ margin: "0 5px" }}
            onClick={() => saveEmployee(employees)}
          >
            Save
          </Button>
          <Button
            color="error"
            style={{ margin: "0 5px" }}
            onClick={() => setEmployees([])}
          >
            Cancel
          </Button>
        </>
      ) : (
        ""
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Job Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((item) => (
            <>
              <TableRow key={item.email}>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.jobTitle}</TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
      <TheModal isModalOpen={modal} setIsModalOpen={setModal}>
        <Box
          sx={{
            width: "min(90%, 750px)",
            backgroundColor: "#fff",
            padding: "45px 30px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "space-between",
              marginBottom: "50px",
            }}
          >
            <TextField
              id="firstName"
              label="First Name"
              type="text"
              variant="standard"
              value={newEmployee?.firstName}
              onChange={(e) =>
                setNewEmployee((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
            />
            <TextField
              id="lastName"
              label="Last Name"
              type="text"
              variant="standard"
              value={newEmployee?.lastName}
              onChange={(e) =>
                setNewEmployee((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
            />
            <TextField
              id="role"
              label="Role"
              type="text"
              variant="standard"
              value={newEmployee?.role}
              onChange={(e) =>
                setNewEmployee((prev) => ({
                  ...prev,
                  role: e.target.value,
                }))
              }
            />
            <TextField
              id="jobTitle"
              label="job title"
              type="text"
              variant="standard"
              value={newEmployee?.jobTitle}
              onChange={(e) =>
                setNewEmployee((prev) => ({
                  ...prev,
                  jobTitle: e.target.value,
                }))
              }
            />
            <TextField
              id="email"
              label="email"
              type="text"
              variant="standard"
              value={newEmployee?.email}
              onChange={(e) =>
                setNewEmployee((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
            <Select
              sx={{ flexGrow: "1" }}
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={
                newEmployee?.department ? newEmployee.department : ""
              }
              onChange={(e) =>
                setSelectedEmployee((prev) => ({
                  ...prev,
                  department: e.target.value,
                }))
              }
              label="Age"
            >
              <MenuItem value={null}>
                <em>None</em>
              </MenuItem>
              {departments.map((department) => (
                <MenuItem key={department.id} value={department.id}>
                  {department.name}
                </MenuItem>
              ))}
            </Select>
            <Button onClick={() => saveEmployee([newEmployee])}>Save</Button>
          </Box>
        </Box>
      </TheModal>
    </>
  )
}

export default AddEmployee
