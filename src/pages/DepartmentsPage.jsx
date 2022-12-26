import { Box, Button, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DepartmentsTable from "../components/DepartmentsTable"
import TheModal from "../components/TheModal"
import { useAuth } from "../context/AuthContext"
import { addDepartment, getAllDepartments } from "../services/department"

function DepartmentsPage() {
  const [departments, setDepartments] = useState([])
  const [newDepartment, setNewDepartments] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
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
    } catch (e) {
      console.error(e)
    }
  }

  const handleAddDepartment = async (e) => {
    await addDepartment({ name: newDepartment }, headers)
    // console.log(newDepartment)
    // console.log(departments)
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
        <Button onClick={() => setIsModalOpen(true)}>Add Department</Button>
      </Box>
      <DepartmentsTable departments={departments} />
      <TheModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <Box
          component="form"
          onSubmit={handleAddDepartment}
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
              justifyContent: "center",
            }}
          >
            <TextField
              id="name"
              label="Name"
              type="text"
              variant="standard"
              value={newDepartment}
              onChange={(e) => setNewDepartments(e.target.value)}
            />
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
              Add
            </Button>
          </Box>
        </Box>
      </TheModal>
    </>
  )
}

export default DepartmentsPage
