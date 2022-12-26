import { Box, Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DepartmentsTable from "../components/DepartmentsTable"
import { useAuth } from "../context/AuthContext"
import { getAllDepartments } from "../services/department"

function DepartmentsPage() {
  const [departments, setDepartments] = useState([])
  const { headers, token } = useAuth()
  const navigate = useNavigate()
  if (!token) {
    navigate("/auth/login")
  }

  useEffect(() => {
    getDepartments()
  }, [])

  const getDepartments = async () => {
    try {
      const data = await getAllDepartments(headers)
      setDepartments(data)
    } catch(e) {
      console.error(e)
    }
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "24px",
        }}
      >
        <Button>Add Manually</Button>
      </Box>
      <DepartmentsTable departments={departments} />
    </>
  )
}

export default DepartmentsPage
