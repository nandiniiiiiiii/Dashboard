import React, { useContext, useState } from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import { useTheme, Button, ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { ColorModeContext, tokens } from "../theme";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography, Box } from '@mui/material';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartIcon from '@mui/icons-material/PieChart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';

function SideBar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <>
      <Drawer
        variant="permanent"
        open={!isCollapsed}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
            width: isCollapsed ? 56 : 240,
            transition: 'width 0.3s',
            overflowX: 'hidden',
          },
        }}
      >
        <List>
          <Box textAlign="center" mt={3}>
            <IconButton onClick={colorMode.toggleColorMode}>
              <Typography variant="body1" color={colors.grey[100]}>
                <h1>Blackshoffer</h1>
              </Typography>
            </IconButton>
          </Box>
        </List>
        <ListItemButton component={Link} to="/">
          <ListItemIcon sx={{ color: colors.grey[100] }}>
            <HomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} to="/stats">
          <ListItemIcon sx={{ color: colors.grey[100] }}>
            <PieChartIcon />
          </ListItemIcon>
          <ListItemText primary="Stats" />
        </ListItemButton>
        <ListItemButton component={Link} to="/graphs">
          <ListItemIcon sx={{ color: colors.grey[100] }}>
            <BarChartOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Graphs" />
        </ListItemButton>
        <ListItemButton component={Link} to="/dates">
          <ListItemIcon sx={{ color: colors.grey[100] }}>
            < CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="Date" />
        </ListItemButton>
        <ListItemButton component={Link} to="/other">
          <ListItemIcon sx={{ color: colors.grey[100] }}>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Other charts" />
        </ListItemButton>
      </Drawer>
    </>
  )
}

export default SideBar
