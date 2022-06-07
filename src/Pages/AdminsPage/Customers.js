import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
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
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import ViewUserModal from './Modals/ViewUserModal';


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

export default function Customers() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [dataUser, setDataUser] = useState();
  useEffect(()=>{
    fetch('https://localhost:7191/User/GetUsers')
    .then(response => response.json())
    .then(json => setDataUser(json));
} ,[]
);

const [user, setUser] = useState({});
const [viewShow, setViewShow] = useState(false);
const handleViewClose = () => setViewShow(false);
const handleViewShow = (user) => {
        setUser(user);
        setViewShow(true);
    }
  const Root = styled('div')`
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
  
    td,
    th {
      border: 1px solid #ddd;
      text-align: left;
      padding: 8px;
    }
  
    th {
      background-color: #ddd;
    }
  `;
  const isAdmin = sessionStorage.getItem('isAdmin');
  return isAdmin ? (
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Users List */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Root>
                <table aria-label="custom pagination table"> 
                    <thead>
                        <tr>
                        <th>Mã KH</th>
                        <th>Username</th>
                        <th>Tên</th>
                        <th>SĐT</th>
                        <th>Email</th>
                        <th>Quyền</th>
                        <th>Ngày ĐK</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataUser && dataUser.map((user, index) => (
                            <tr key={index}>  
                                <td>{user.userId}</td>
                                <td>{user.username}</td>
                                <td>
                                {
                                user.fullName === null ? 'Chưa đặt' : user.fullName
                                }
                                </td>
                                <td>{
                                user.phoneNumber === null ? 'Chưa đặt' : user.phoneNumber
                                }</td>
                                <td>{
                                user.email === null ? 'Chưa đặt' : user.email
                                }</td>
                                <td>{user.isAdmin ? 'Admin' : 'Khách Hàng'}</td>
                                <td>
                                  {
                                    new Date(user.createdAt).toLocaleDateString('en-GB')
                                  }
                                </td>
                                <td>
                                <Button variant="outlined" size='small' color="success" onClick={() => handleViewShow(user)}>Xem
                                </Button>
                      
                                </td>
                
                            </tr>
                        ))} 
                 </tbody>

                </table>
                </Root>
                <ViewUserModal show={viewShow} onHide={handleViewClose} user={user}/>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  ): (
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

