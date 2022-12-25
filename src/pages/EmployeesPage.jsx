import { Box } from "@mui/system"
import Button from "@mui/material/Button"
import EmployeesTable from '../components/EmployeesTable'
function EmployeesPage() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "10",
          justifyContent: "flex-end",
          marginBottom: "24px"
        }}
      >
        <Button>Import CSV</Button>
        <Button>Add Manually</Button>
      </Box>
      <Box>
        <EmployeesTable />
      </Box>
    </>
  )
}

export default EmployeesPage
