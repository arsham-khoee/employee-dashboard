import { useEffect, useState } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { Link as RouterLink, redirect, useNavigate } from "react-router-dom"
import validateEmail from "../utils/validateEmail"
import validatePassword from "../utils/validatePassword"
import { login } from "../services"
import { useAuth } from "../context/AuthContext"

export default function LoginPage() {
  const [isEmailVaild, setIsEmailVaild] = useState(true)
  const { dispatch, isAuth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) navigate("/employees")
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    try {
      const payload = await login({
        email: data.get("email"),
        password: data.get("password"),
      })
      if (payload.token) dispatch({ type: "LOGIN", payload })

      navigate("/employees")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container component="div" maxWidth="xs">
      <CssBaseline />
      <div>{isEmailVaild}</div>
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
          Log in
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
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
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log in
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            {/* <Grid item> */}
            <Link to="/auth/signup" variant="body2" component={RouterLink}>
              Don't have an account? Sign Up
            </Link>
            {/* </Grid> */}
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
