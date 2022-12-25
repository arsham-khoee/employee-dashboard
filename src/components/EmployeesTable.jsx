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
import { Button, Modal } from "@mui/material"
import TheModal from "./TheModal"

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

// Row.propTypes = {
//   row: PropTypes.shape({
//     firstName: PropTypes.string.isRequired,
//     lastName: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     address: PropTypes.string.isRequired,
//     role: PropTypes.string.isRequired,
//     jobTitle: PropTypes.string.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         previousDepartment: PropTypes.string.isRequired,
//         currentDepartment: PropTypes.string.isRequired,
//         assignor: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//   }).isRequired
//   setSelectedEmployee
// }

function Row({ row, setSelectedEmployee }) {
  // const { row } = props
  const [open, setOpen] = useState(false)

  const handleEdit = (row) => {
    console.log(row)
  }

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
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
            onClick={() => setSelectedEmployee(row)}
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
                    <TableCell>Date</TableCell>
                    <TableCell>Assignor</TableCell>
                    <TableCell>Previous Department</TableCell>
                    <TableCell>Current Department</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.assignor}</TableCell>
                      <TableCell>{historyRow.previousDepartment}</TableCell>
                      <TableCell>{historyRow.currentDepartment}</TableCell>
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

const rows = [
  createData("ali", "alavi", "ali@gmail.com", "asd", "bbb", "ccc", [
    {
      previousDepartment: "aaa",
      currentDepartment: "aaa",
      assignor: "44",
      date: "asd",
    },
  ]),
]

export default function EmployeesTable() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const handleModal = () => {
    setIsModalOpen(true)
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
            {rows.map((row) => (
              <Row
                key={row.email}
                row={row}
                setSelectedEmployee={setSelectedEmployee}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button onClick={handleModal}>Open modal</Button>
      <TheModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Box
          sx={{
            width: "min(90%, 800px)",
            backgroundColor: "#fff",
            padding: "20px",
          }}
        >
          <div>{selectedEmployee}</div>
        </Box>
      </TheModal>
    </>
  )
}
