import { Box } from "@mui/system"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import EmployeesTable from "../components/EmployeesTable"
import React, { useEffect, useState } from "react"
import { getAllEmployees } from "../services/employee"
import { useAuth } from '../context/AuthContext'
import { useNavigate } from "react-router-dom"

const handleSearch = (e) => {
  if (e.key === "Enter") console.log("Do search")
}


function EmployeesPage() {
  const [employees, setEmployees] = useState([])
  const { headers, token } = useAuth()
  const navigate = useNavigate()
  if (!token) {
    navigate('/auth/login')
  }

  useEffect(() => {
    getEmployees()
    console.log(employees)
  }, [])

  const getEmployees = async () => {
    try {
      const data = await getAllEmployees(headers)
      setEmployees(() => ([...data]))
    } catch (e) {
      console.log('error')
      console.log(e)
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "10",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <TextField
          id="search"
          label="Search table entries..."
          type="search"
          variant="standard"
          onKeyDown={handleSearch}
        />
        <Box sx={{ marginLeft: "auto" }}>
          <Button>Import CSV</Button>
          <Button>Add Manually</Button>
        </Box>
      </Box>
      <Box>
        <EmployeesTable setEmployees={setEmployees} employees={employees} />
      </Box>
    </>
  )
}

export default EmployeesPage
