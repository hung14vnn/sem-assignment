import * as React from 'react';
import Table from '@mui/material/Table';
import Title from './Title';
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
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import { useState,useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import axios from "axios";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';

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

export default function OrdersPageDetails() {
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
    
    const [productData, setProductData] = useState();
    useEffect(() => {
    fetch('https://localhost:7191/Product/get-raw-products')
      .then((response) => response.json())
      .then((json) => setProductData(json));
    }, []);
    const temp = useParams().id;
    const [cartItemsData,setCartItemsData] = useState();
        useEffect(() => {
            (async () => {
                await axios({
                    method: 'GET',
                    url: `https://localhost:7191/Cart/get-cart-items?id=${temp}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    setCartItemsData(response.data);
                }).catch(error => {
                    console.log(temp);
                }
                );
            })();
        }, [temp]); 
       
      const [cartData,setCartData] = useState({});
        useEffect(() => {
            (async () => {
                await axios({
                    method: 'GET',
                    url: `https://localhost:7191/Cart/get-cart-by-cartId?id=${temp}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                  setCartData(response.data);
                }).catch(error => {
                    console.log("hello");
                }
                );
            })();
        }, [temp]); 
      const handleUpdate = (event) => {
        event.preventDefault();
        fetch(`https://localhost:7191/Cart/update-transaction-status?id=${temp}`, {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(function (response) {
      if(response.status === 200)
      {
      alert("???? C???p Nh???t ????n H??ng");
      window.location.reload();
    }
    else if (response.status === 500)
    {
      alert("????n H??ng ???? Ho??n Th??nh Ho???c B??? Hu???");
    }
    else
    {
      alert("???? C?? L???i X???y Ra");
    }
    })

  }
    const handleCancel = (event) => {
      event.preventDefault();
      fetch(`https://localhost:7191/Cart/cancel-transaction-status?id=${temp}`, {  
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
  })
   .then(function (response) {
      if(response.status === 200)
      {
      alert("???? Hu??? ????n H??ng");
      window.location.reload();
    }
    else if (response.status === 500)
    {
      alert("????n H??ng ???? Ho??n Th??nh Ho???c B??? Hu???");
    }
    else
    {
      alert("???? C?? L???i X???y Ra");
    }
    })
  }


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
              Qu???n L??
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={1} color="secondary">
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
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <React.Fragment>
      <Title>????n H??ng {temp}</Title>
      <Table striped bordered hover minRows={0}>
                <thead>
                    <tr>

                        <th>T??n S???n Ph???m</th>
                        <th>S??? L?????ng</th>
                        <th>????n Gi??</th>
                        <th>T???ng Gi??</th>
                    </tr>
                </thead>
                <tbody>
                {cartItemsData && cartItemsData.map((item) => {
                                        return (
                                            <tr key={item.productId}>
                                                <td>
                                                    {productData && productData.map((item2) => {
                                                        if (item.productId === item2.productId) {
                                                            return (
                                                                <div key={item2.productId}>
                                                                    <a href={`/details/${item2.productId}`}>{item2.name}</a>
                                                                </div>
                                                            );
                                                        }
                                                    })}
                                                </td>
                                                <td>
                                                {item.quantity}
                                                </td>
                                                <td>
                                                { productData && productData.map((item2) => {
                                                        if ( item.productId === item2.productId) {
                                                            return (
                                                                <div key={item2.productId}>
                                                                    {(item2.price * (100 - item2.discount)) / 100}
                                                                </div>
                                                            );
                                                        }
                                                    })}
                                                  
                                                </td>
                                                <td>{ productData && productData.map((item2) => {
                                                    if (item.productId === item2.productId) {
                                                        return (
                                                            <div key={item2.productId}>
                                                                {(item2.price * (100 - item2.discount)) / 100 * item.quantity}
                                                            </div>
                                                        );
                                                    }
                                                })}</td>
                                            </tr>
                                        );
                                    })}
                                  
                </tbody>

                      <tfoot>
                        <tr>
                            <td colSpan="3" className="text-right">
                                <strong>T???ng Ti???n:</strong>
                            </td>
                            <td>
                            {cartData.totalPrice}
                            </td>
                        </tr>
                      </tfoot>   
            </Table>
    </React.Fragment>
    <React.Fragment className="text-left">
    <Title>Tr???ng Th??i ????n H??ng</Title>
    <Timeline>
      <TimelineItem>
      <TimelineOppositeContent color="text.secondary">
          {new Date(cartData.createdAt).toLocaleString('en-GB')}
          </TimelineOppositeContent>
        <TimelineSeparator>
        {cartData.status > 1 ?  <TimelineDot color="success" /> :  <TimelineDot />}
          {cartData.status > 1 ? <TimelineConnector /> : null}
        </TimelineSeparator>
        <TimelineContent>Ch??? X??c Nh???n</TimelineContent>
      </TimelineItem>

      <TimelineItem>
         {cartData.status === 3 ?  <TimelineOppositeContent color="text.secondary">
          {new Date(cartData.updatedAt).toLocaleString('en-GB')}
          </TimelineOppositeContent> : null}
        <TimelineSeparator>
          {cartData.status > 2 ?  <TimelineDot color="success" /> :  <TimelineDot />}
          {cartData.status > 2 ? <TimelineConnector /> : null}
        </TimelineSeparator>
        <TimelineContent>G???i H??ng Cho ??VVC</TimelineContent>
      </TimelineItem>

      <TimelineItem>
         {cartData.status === 4 ?  <TimelineOppositeContent color="text.secondary">
          {new Date(cartData.updatedAt).toLocaleString('en-GB')}
          </TimelineOppositeContent> : null}
        <TimelineSeparator>
          {cartData.status > 3 ?  <TimelineDot color="success" /> :  <TimelineDot />}
          {cartData.status > 3 ? <TimelineConnector /> : null}
        </TimelineSeparator>
        <TimelineContent>??ang Giao H??ng</TimelineContent>
      </TimelineItem>

      <TimelineItem>
          {cartData.status === 5 ?  <TimelineOppositeContent color="text.secondary">
          {new Date(cartData.updatedAt).toLocaleString('en-GB')}
          </TimelineOppositeContent> : null}
        <TimelineSeparator>
          {cartData.status > 4 ?  <TimelineDot color="success" /> :  <TimelineDot />}
        </TimelineSeparator>
        <TimelineContent>???? Giao H??ng</TimelineContent>
      </TimelineItem>
      {cartData.status === 0 ? 
      <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
          {new Date(cartData.updatedAt).toLocaleString('en-GB')}
          </TimelineOppositeContent>
        <TimelineSeparator>
        <TimelineDot color="secondary" />
        </TimelineSeparator>
        <TimelineContent>???? Hu???</TimelineContent>
      </TimelineItem>
      : null}

    </Timeline>
    <div>
    <button onClick={handleUpdate} className="btn btn-success" style={{marginLeft:"20%"}}>Chuy???n tr???ng th??i</button>
    <button onClick={handleCancel} className="btn btn-danger" style={{marginLeft:"30%"}}>Hu??? ????n h??ng n??y </button>
    </div>  
    </React.Fragment>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  ):(
    // show the text in the middle of the page using bootstrap
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>B???n kh??ng c?? quy???n truy c???p</h1>
        </div>
      </div>
    </div>
  );
}

