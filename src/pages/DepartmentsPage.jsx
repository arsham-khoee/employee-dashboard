import { Box, Button } from "@mui/material"
import React from "react"
import DepartmentsTable from "../components/DepartmentsTable"

function DepartmentsPage() {
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
      <DepartmentsTable />
    </>
  )
}

export default DepartmentsPage
