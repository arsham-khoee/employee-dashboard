import { useState } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import validateEmail from "../utils/validateEmail"
import validatePassword from "../utils/validatePassword"
import { signup } from "../services/auth"

export default function LoginPage() {
  const navigate = useNavigate()
  const [isEmailVaild, setIsEmailVaild] = useState(true)
  const [isPasswordVaild, setIsPasswordVaild] = useState(true)
  const [isPasswordMatch, setIsPasswordMatch] = useState(true)

  const checkPasswordMatching = (pass, confPass) => pass === confPass

  const handleSignup = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    setIsEmailVaild(validateEmail(data.get("email")))
    setIsPasswordVaild(validatePassword(data.get("password")))

    const pass = document.getElementById("password").value
    const confPass = document.getElementById("confirm-password").value
    const areMatch = checkPasswordMatching(pass, confPass)

    setIsPasswordMatch(areMatch)

    try {
      console.log("mail", isEmailVaild)
      console.log("pass", isPasswordVaild)
      console.log("match", areMatch)
      if (isEmailVaild && isPasswordVaild && areMatch) {
        const payload = await signup({
          email: data.get("email"),
          password: data.get("password"),
        })

        console.log(payload)

        navigate("/auth/login")
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container component="div" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 1 }}>
          <TextField
            error={!isEmailVaild}
            helperText={isEmailVaild ? null : "Invalid email address."}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            error={!isPasswordVaild}
            helperText={
              isPasswordVaild
                ? null
                : "Password must be 8 characters or longer, including digits without containing any spaces."
            }
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <TextField
            error={!isPasswordMatch}
            helperText={isPasswordMatch ? null : "Your passwords do not match."}
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/auth/login" variant="body2" component={RouterLink}>
                Already have an account? Log In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
