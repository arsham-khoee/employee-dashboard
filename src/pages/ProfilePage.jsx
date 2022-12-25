import { Avatar, Button, TextField } from "@mui/material"
import { Box, Container } from "@mui/system"

function ProfilePage() {
  const stringAvatar = (name) => {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    }
  }
  
  const handleProfileUpdate = (e) => {
    e.preventDefault()
    console.log("handle")
  }
  return (
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
        {...stringAvatar("Kent Dodds")}
      />
      <Box component="form" onSubmit={handleProfileUpdate} sx={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        <TextField
          id="firstName"
          label="First Name"
          type="text"
          variant="standard"
          value="Ali"
        />
        <TextField
          id="lastName"
          label="Last Name"
          type="text"
          variant="standard"
          value="Alavi"
        />
        <TextField
          sx={{ width: "100%", maxWidth: "408px" }}
          id="email"
          label="Email"
          type="email"
          variant="standard"
          value="ali@gmail.com"
        />
        <TextField
          sx={{ width: "100%", maxWidth: "408px" }}
          id="address"
          label="Address"
          type="text"
          variant="standard"
          value="Alavi Alavi Alavi Alavi Alavi Alavi"
        />
      </Box>
      <Button type="submit" variant="contained" sx={{marginTop: "50px"}}>update profile</Button>
    </Container>
  )
}

export default ProfilePage
