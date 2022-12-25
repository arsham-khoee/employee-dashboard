import { Box } from "@mui/system"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import EmployeesTable from "../components/EmployeesTable"
import { useEffect } from "react"
import { getAllEmployees } from "../services/employee"

const handleSearch = (e) => {
  if (e.key === "Enter") console.log("Do search")
}

function EmployeesPage() {
  useEffect(() => {
    const getEmployees = async () => {
      const data = await getAllEmployees()
      console.log(data)
    }

    getEmployees()
  }, [])

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
        <EmployeesTable />
      </Box>
    </>
  )
}

export default EmployeesPage
