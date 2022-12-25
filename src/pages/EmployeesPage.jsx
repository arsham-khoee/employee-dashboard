import { Box } from "@mui/system"
import Button from "@mui/material/Button"
function EmployeesPage() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "10",
          justifyContent: "flex-end"
        }}
      >
        <Button>Import CSV</Button>
        <Button>Add Manually</Button>
      </Box>
    </>
  )
}

export default EmployeesPage
