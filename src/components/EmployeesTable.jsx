import { useState } from "react"
import PropTypes from "prop-types"
import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import IconButton from "@mui/material/IconButton"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import EditIcon from "@mui/icons-material/Edit"
import { Button, MenuItem, Modal, Select, TextField } from "@mui/material"
import TheModal from "./TheModal"
import {
  getHistoryById,
  updateEmployee,
  deleteEmployee,
} from "../services/employee"
import { useAuth } from "../context/AuthContext"
import { getAllDepartments } from "../services/department"

function createData(
  firstName,
  lastName,
  email,
  address,
  role,
  jobTitle,
  history
) {
  return {
    firstName,
    lastName,
    email,
    address,
    role,
    jobTitle,
    history,
  }
}

function Row({ row, setSelectedEmployee, openModal, setDepartments }) {
  const [open, setOpen] = useState(false)
  const [history, setHistory] = useState([])
  const { headers, user } = useAuth()

  const handleEdit = async (row) => {
    setSelectedEmployee(row)
    openModal()
    const departments = await getAllDepartments(headers)
    setDepartments(departments)
    console.log(row)
    console.log(departments)
  }

  const getHistory = async (id) => {
    const data = await getHistoryById(id, headers)
    setHistory(data)
    console.log("history", data)
    setOpen(!open)
  }

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => getHistory(row.id)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.firstName}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.lastName}
        </TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.address}</TableCell>
        <TableCell>{row.role}</TableCell>
        <TableCell>{row.jobTitle}</TableCell>
        <TableCell>
          <IconButton
            aria-label="edit"
            size="small"
            disabled={user.role !== "ADMIN"}
            onClick={() => handleEdit(row)}
          >
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Assignor</TableCell>
                    <TableCell>Previous Department</TableCell>
                    <TableCell>Current Department</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell>{historyRow.assignor.email}</TableCell>
                      <TableCell>
                        {historyRow.previousDepartment
                          ? historyRow.previousDepartment.name
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {historyRow.currentDepartment
                          ? historyRow.currentDepartment.name
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default function EmployeesTable({ employees, setEmployees }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [departments, setDepartments] = useState([])
  const { headers } = useAuth()

  const handleUpdate = async (e) => {
    try {
      e.preventDefault()
      console.log("selectedEmployee", selectedEmployee)
      const data = await updateEmployee(
        selectedEmployee.id,
        selectedEmployee,
        headers
      )
      console.log("req:", selectedEmployee)
      console.log("data:", data)
      setEmployees((prev) =>
        prev.map((item) =>
          item.id == selectedEmployee.id ? selectedEmployee : item
        )
      )
      setIsModalOpen(false)
    } catch (e) {
      console.log(e)
    }
  }

  const handleDelete = async (e) => {
    try {
      e.preventDefault()
      await deleteEmployee(selectedEmployee.id, headers)
      setEmployees((prev) =>
        prev.filter((item) => item.id !== selectedEmployee.id)
      )
      setIsModalOpen(false)
    } catch (e) {
      console.log("error")
      console.log(e)
    }
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((row) => (
              <Row
                key={row.email}
                row={row}
                setSelectedEmployee={setSelectedEmployee}
                openModal={() => setIsModalOpen(true)}
                setDepartments={setDepartments}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TheModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Box
          component="form"
          onSubmit={handleUpdate}
          sx={{
            width: "min(90%, 800px)",
            backgroundColor: "#fff",
            padding: "45px 30px",
          }}
        >
          <Box
            sx={{
              display: "flex",
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
              value={selectedEmployee?.firstName}
              onChange={(e) =>
                setSelectedEmployee((prev) => ({
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
              value={selectedEmployee?.lastName}
              onChange={(e) =>
                setSelectedEmployee((prev) => ({
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
              value={selectedEmployee?.role}
              onChange={(e) =>
                setSelectedEmployee((prev) => ({
                  ...prev,
                  role: e.target.value,
                }))
              }
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            <TextField
              sx={{ flexGrow: "2" }}
              id="address"
              label="Address"
              type="text"
              variant="standard"
              value={selectedEmployee?.address ? selectedEmployee.address : ""}
              onChange={(e) =>
                setSelectedEmployee((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
            />
            <TextField
              sx={{ flexGrow: "1" }}
              id="jobTitle"
              label="Job Title"
              type="text"
              variant="standard"
              value={selectedEmployee?.jobTitle}
              onChange={(e) =>
                setSelectedEmployee((prev) => ({
                  ...prev,
                  jobTitle: e.target.value,
                }))
              }
            />
            <Select
              sx={{ flexGrow: "1" }}
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={
                selectedEmployee?.department ? selectedEmployee.department : ""
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
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <Button variant="contained" type="submit">
              Update
            </Button>
            <Button
              onClick={(e) => handleDelete(e)}
              variant="outlined"
              color="error"
            >
              Delete
            </Button>
          </Box>
        </Box>
      </TheModal>
    </>
  )
}
