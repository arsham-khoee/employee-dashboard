import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { useNavigate } from "react-router-dom"

const createData = (name, employeeCount) => {
  return { name, employeeCount }
}

const selectDepartment = (row) => {
  console.log(row)
}

const rows = [
  createData("Information Technology", 11),
  createData("Human Resources", 5),
  createData("Technical", 59),
]

export default function DepartmentsTable({ departments }) {
  const navigate = useNavigate()

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Employee Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {departments.map((department) => (
            <TableRow
              key={department.id}
              sx={{
                pointerEvents: department.employeeCount === 0 ? "none" : "auto",
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": {
                  backgroundColor: "#eee",
                  cursor:
                    department.employeeCount === 0 ? "not-allowed" : "pointer",
                },
              }}
              onClick={() => navigate(`/employee/department/${department.id}`)}
            >
              <TableCell component="th" scope="row">
                {department.name}
              </TableCell>
              <TableCell>{department.employeeCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
