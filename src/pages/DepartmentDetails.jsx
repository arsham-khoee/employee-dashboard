import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import EmployeesTable from "../components/EmployeesTable"
import { useAuth } from "../context/AuthContext"
import { getEmployeesByDepartment } from "../services/employee"

function DepartmentDetails() {
  const params = useParams()
  const [employees, setEmployees] = useState([])

  const { headers, token } = useAuth()
  const navigate = useNavigate()
  if (!token) {
    navigate("/auth/login")
  }

  useEffect(() => {
    getEmployees()
    console.log(employees)
  }, [])

  const getEmployees = async () => {
    try {
      const data = await getEmployeesByDepartment(params.id, headers)
      setEmployees(data)
    } catch (e) {
      console.log("error")
      console.log(e)
    }
  }

  return (
    <Box>
      <EmployeesTable setEmployees={setEmployees} employees={employees} />
    </Box>
    // <div>Hi</div>
  )
}

export default DepartmentDetails
