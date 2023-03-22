import React, { useState } from 'react';

import {
Menu,
MenuItem,
Paper,
Tooltip,
AppBar,
Box,
Toolbar,
Typography,
IconButton,
Avatar,
SvgIcon
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { Link,useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function HomeIcon(props) {
  
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function NavBar() {
  const navigate = useNavigate();
  const [abrir, setAbrir] = useState(false);

  const handleOpenUserMenu = () => {
    setAbrir(true);
  };

  const handleCloseUserMenu = () => {
    setAbrir(false);
  };

  const habldeRefresh = () => {
    window.location.reload()
  }

  const handleLogout = (e) => {
    e.preventDefault();
    cookies.remove('usuario');
    alert('Cerrar Sesión');
    window.location.reload()
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      navigate(`/Perfil/${event.target.value}`);
      window.location.reload()
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={habldeRefresh}
          >
            <DashboardIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CampusConnect
          </Typography>

          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 150 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Carnet"
              inputProps={{ 'aria-label': 'search google maps' }}
              onKeyDown={handleKeyDown}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>

          </Paper>

          <Link to="/"
            style={{ textDecoration: "none", color: "white", marginRight: "1%", marginLeft: "3%" }}
          >
            <Tooltip title="Inicio">
              <IconButton
                edge="start"
                color="inherit"
                style={{ backgroundColor: "#3A92FD" }}
              >
                <HomeIcon sx={{ fontSize: 25 }} />
              </IconButton>
            </Tooltip>
          </Link>

          <Tooltip title="Cuenta">
            <IconButton
              sx={{ p: 0 }}
              onClick={handleOpenUserMenu}
            >
              <Avatar
                sx={{ bgcolor: "#3A92FD" }}
                alt={cookies.get('usuario').nombres}
                src="/broken-image.jpg"
              />
            </IconButton>
          </Tooltip>

          <Paper>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              anchorEl={document.body}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={abrir}
              onClose={handleCloseUserMenu}
            >
              <Link to={`/Perfil/${cookies.get('usuario').registro_academico}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>Perfil</MenuItem>  </Link>
              <MenuItem
                onClick={handleLogout}
              >
                Cerrar Sesión
              </MenuItem>
            </Menu>
          </Paper>

        </Toolbar>
      </AppBar>
    </Box>
  );
}