import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import AppBar from "@mui/material/AppBar"
import CssBaseline from "@mui/material/CssBaseline"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Diversity3Icon from "@mui/icons-material/Diversity3"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import ApartmentIcon from "@mui/icons-material/Apartment"
import LogoutIcon from "@mui/icons-material/Logout"
import { Link, Outlet } from "react-router-dom"

const drawerWidth = 200

const navMenu = [
  {
    label: "Employees",
    icon: <Diversity3Icon />,
  },
  {
    label: "Departments",
    icon: <ApartmentIcon />,
  },
  {
    label: "Profile",
    icon: <ManageAccountsIcon />,
  },
  {
    label: "Logout",
    icon: <LogoutIcon />,
  },
]

export default function ClippedDrawer() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Employee Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box style={{ height: "100%" }} sx={{ overflow: "auto" }}>
          <List
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            {navMenu.map((item, index) => (
              <Link
                key={index}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  marginTop: index === 3 ? "auto" : "",
                }}
                to={item.label}
              >
                <ListItem
                  key={item.label}
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}
