import * as React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Button, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Speedometer from '../Dials/speedometer2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import '../Homehcsr04/Home.css'
import LineChart2 from '../LineCharts/Linechart2';
import Dial2 from '../Dials/Dial2.jsx';
import { Link } from 'react-router-dom';
const drawerWidth = 240;

function Homeds18b40(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedChart, setSelectedChart] = React.useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [anchorE2, setAnchorE2] = React.useState(null);
  const open1 = Boolean(anchorE2);

  const handleClick1 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorE2(null);
  };
  const handleChartButtonClick = (chartType) => {
    setSelectedChart(chartType);
    handleClose();
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
      <Typography variant="h6" component='h6' sx={{textAlign:'center',fontWeight:'600',marginBottom:'30px'}}>DS18B40</Typography>
      <ListItem disablePadding>
          <ListItemButton style={{ paddingLeft: '20px' }}>
            <Button
              id="fade-button-2"
              aria-controls={open1 ? 'fade-menu-2' : undefined}
              aria-haspopup="true"
              aria-expanded={open1 ? 'true' : undefined}
              onClick={handleClick2} variant='outlined'
            >
             Sensor
            </Button>
            <Menu
              id="fade-menu-2"
              MenuListProps={{
                'aria-labelledby': 'fade-button-2',
              }}
              anchorEl={anchorE2}
              open={open1}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem>
              <Link to='/'>Sensor1-ky040</Link>
              </MenuItem>
              <MenuItem>
              <Link to='/ds18b20'>Sensor2-ds18b40</Link>
              </MenuItem>
              <MenuItem>
              <Link to='/hcsr04'>Sensor3-hcsr04</Link>
              </MenuItem>
              <MenuItem><Link to='/fsr'>Sensor4-fsr</Link></MenuItem>
            </Menu>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{marginBottom:'30px'}}>
          <ListItemButton style={{ paddingLeft: '20px' }}>
            <Button
              id="fade-button-1"
              aria-controls={open ? 'fade-menu-1' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick1}  variant='outlined'
            >
              Chart Type
            </Button>
            <Menu
              id="fade-menu-1"
              MenuListProps={{
                'aria-labelledby': 'fade-button-1',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
            <MenuItem sx={{fontSize:'20px'}}  onClick={() => handleChartButtonClick('line')}>
              Chart Line
            </MenuItem>
              <MenuItem sx={{fontSize:'20px'}} onClick={() => handleChartButtonClick('dial')}>
              Dial
              </MenuItem>
            </Menu>
          </ListItemButton>
        </ListItem>
       
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            Panel For Sensor Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Stack direction="column" sx={{justifyContent:'center'}}/>
          <div style={{width:'95%',justifyContent:'center',marginLeft:'10px'}}>
          {selectedChart === 'line' ? <LineChart2 /> : selectedChart === 'dial' ? <Speedometer /> : null}
          </div>
      </Box>
    </Box>
  );
}

Homeds18b40.propTypes = {
  window: PropTypes.func,
};

export default Homeds18b40;
