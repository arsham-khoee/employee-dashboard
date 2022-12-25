import { Box } from "@mui/system"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import EmployeesTable from "../components/EmployeesTable"

const handleSearch = (e) => {
  if (e.key === "Enter") console.log("Do search")
} 


function EmployeesPage() {
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
