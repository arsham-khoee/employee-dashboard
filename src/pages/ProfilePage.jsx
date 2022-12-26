import { Avatar, Button, TextField, Snackbar } from "@mui/material"
import { Box, Container } from "@mui/system"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { updateEmployee } from "../services/employee"

function ProfilePage() {
  const [data, setData] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  )

  const [firstName, setFirstName] = useState(data.firstName)
  const [lastName, setLastName] = useState(data.lastName)
  const [email, setEmail] = useState(data.email)
  const [address, setAddress] = useState(() =>
    data.address ? data.address : ""
  )

  const [isSnackOpen, setIsSnackOpen] = useState(false)
  const [snackMsg, setSnackMsg] = useState("")

  const { headers } = useAuth()

  const stringAvatar = (name) => {
    return {
      children: `${name.split(" ")[0][0].toUpperCase()}${name
        .split(" ")[1][0]
        .toUpperCase()}`,
    }
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    const firstName = document.getElementById("firstName").value
    const lastName = document.getElementById("lastName").value
    const email = document.getElementById("email").value
    const address = document.getElementById("address").value

    const newData = { firstName, lastName, email, address }

    try {
      const res = await updateEmployee(data.id, newData, headers)
      localStorage.setItem("user", JSON.stringify({ ...data, ...newData }))
      setSnackMsg("Profile updated successfully.")
      setIsSnackOpen(true)
    } catch (err) {
      setSnackMsg(err.message)
      setIsSnackOpen(true)
      console.error(err)
    }
  }
  return (
    <>
      <Container
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Avatar
          sx={{
            marginBlock: "50px",
            width: "150px",
            fontSize: "48px",
            height: "150px",
          }}
          {...stringAvatar(`${data.firstName} ${data.lastName}`)}
        />
        <Box
          component="form"
          onSubmit={handleProfileUpdate}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          <TextField
            id="firstName"
            label="First Name"
            type="text"
            variant="standard"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            id="lastName"
            label="Last Name"
            type="text"
            variant="standard"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            sx={{ width: "100%", maxWidth: "408px" }}
            id="email"
            label="Email"
            type="email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            sx={{ width: "100%", maxWidth: "408px" }}
            id="address"
            label="Address"
            type="text"
            variant="standard"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button type="submit" variant="contained" sx={{ marginTop: "50px" }}>
            update profile
          </Button>
        </Box>
      </Container>
      <Snackbar
        autoHideDuration={4000}
        open={isSnackOpen}
        onClose={() => setIsSnackOpen(false)}
        message={snackMsg}
      />
    </>
  )
}

export default ProfilePage
