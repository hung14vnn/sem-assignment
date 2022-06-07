import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import axios from 'axios';
import { Form } from "react-bootstrap";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import {  useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import Button from '@mui/material/Button';
import {FormControl, InputLabel, NativeSelect} from '@mui/material';
import{Col} from 'react-bootstrap';



const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

export default function CustomersDetails() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [data, setData] = useState();
  const handleChange = (event) => {
      setData({...data, [event.target.name]: event.target.value});
  };
  const [isAdmin, setIsAdmin] = useState(data?.isAdmin);
  const handleChangeAdmin = (event) => {
    setIsAdmin(event.target.value);
  };
  const temp = useParams().id;
  useEffect(() => {
    (async () => {
        await axios({
            method: 'GET',
            url: `https://localhost:7191/User/getUserById?id=${temp}`,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            setData(response.data);
        }).catch(error => {
            console.log(error);
        });
    })();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
     fetch(`https://localhost:7191/User/update-user-by-admin?id=${temp}`, {  
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fullName: data.fullName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            location: data.location,
            isAdmin: JSON.parse(isAdmin)
        }),

    })
    .then(response =>{
      if(response.status === 200){
        alert("Update Successfully");
      }
    })
    .catch(error => {
        console.log(error);
    }
    );
  };


  const isAdmin1 = sessionStorage.getItem('isAdmin');
  return isAdmin1 ? (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <div class="site-section">
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <h2 class="h3 mb-5 text-black">User Information</h2>
    </div>
    <div class="col-md-12">

      <form action="#" method="post">

        <div class="p-3 p-lg-5 border">
          <Form.Group className="edit" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control id="edit-input-name" name="fullName" type="text" onChange={handleChange} defaultValue={data?.fullName} />
                </Form.Group>
          <Form.Group className="edit" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control id="edit-input-email" name="email" type="email" onChange={handleChange} defaultValue={data?.email} />
                </Form.Group>
          <Form.Group className="edit" >
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control id="edit-input-phone" name="phoneNumber" type="text" onChange={handleChange} defaultValue={data?.phoneNumber} />
                </Form.Group>
          <Form.Group className="edit" >
                    <Form.Label>Location</Form.Label>
                    <Form.Control id="edit-input-location" name="location" type="text" onChange={handleChange} defaultValue={data?.location} />
                </Form.Group>
          <Form.Group className="edit" >
          <Col>
                    <FormControl fullWidth style={{margin:"10px"}}>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">Role</InputLabel>
                    <NativeSelect
                    name="isAdmin"
                    onChange={handleChangeAdmin}
                    defaultValue={isAdmin}
                        inputProps={{
                          name: 'isAdmin',
                          id: 'uncontrolled-native',
             }}
              >
                  
                  <option value={true}>Admin</option>
                  <option value={false}>User</option>
                </NativeSelect>
                    </FormControl>
                </Col>

        </Form.Group>
            <div class="col-lg-12">
              <input type="submit" onClick={handleSubmit}  class="btn btn-success btn-md btn-block" value="Cập Nhật" />
          </div>
        </div>
      </form>
    </div>
    
  </div>
</div>
</div>
         
        </Box>
      </Box>
    </ThemeProvider>
  ):(
    // show the text in the middle of the page using bootstrap
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Bạn không có quyền truy cập</h1>
        </div>
      </div>
    </div>
  );
}

