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
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import { useState,useEffect } from 'react';
import{Modal,Row,Col,Form} from 'react-bootstrap';
import {FormControl, InputLabel, NativeSelect, TextField} from '@mui/material';
import {Image} from 'react-bootstrap'


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

export default function Publishers() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const changeFormatDatetime = (value) => {
    let tempDatetime = new Date(value);
    return tempDatetime.toLocaleDateString('en-GB');
}
const [data, setData] = useState([
  {
    name: '',
    description: '',
    image: '',
    nationality: '',
  }
]);
const handleChange = (event) => {
    setData({...data, [event.target.name]: event.target.value});

};
const handleSubmit = (event) => {
    event.preventDefault();
     fetch(`https://localhost:7191/Publisher/add-publisher`, {  
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: data.name,
            description: data.description,
            nationality: data.nationality,
            image: photoFileName       
        }),

    })
    .then(response => 
      {
        if(response.ok){
            alert("Thêm thành công");
            window.location.href = "/admin/intergrations";
        }
        else{
            alert("Vui Lòng Đièn Đầy Đủ Thông Tin");
        }
      }
    )
    .catch(error => {
        alert("Đã có lỗi xảy ra");
    });
}

const [photoFileName, setPhotoFileName] = useState();
const imagesrc = 'https://localhost:7191/Photos/'+photoFileName
const handleChangeFile = (event) => {
    setPhotoFileName(event.target.files[0].name);
}

const handleFileUpload = (event) => {
  event.preventDefault();
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('file', file);

  fetch('https://localhost:7191/Category/SaveFile', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(function (response) {
      if(response != null){
          setPhotoFileName(response);
      }
      else{
          alert("Something went wrong");
      }
  })
  .catch(error => {
      alert("Something went wrong");
  });
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
            <Grid container spacing={4}>
              {/* Users List */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Row>
                <Col>
                    <Form.Label>PID</Form.Label>
                    <Form.Control onChange={handleChange} type="text" name="pid" placeholder="PID" readOnly />
                </Col>
                <Col>
                    <Form.Label>Tên</Form.Label>
                    <Form.Control onChange={handleChange} type="text" name="name" placeholder="Name" value={data.name} /> 
                </Col>    
                <Col>
                    <Form.Label>Quốc Tịch</Form.Label>
                    <Form.Control onChange={handleChange} type="text" name="nationality" placeholder="Nationality" value={data.nationality} /> 
                </Col>
                </Row>
                <Row>
                {/* show the textfield below in maxWidth */}
                <Col>
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control onChange={handleChange} as="textarea" rows="3" name="description" placeholder="Description" value={data.description} />
                </Col>
                </Row>
                <Row>
              <Col>
                  <Col>
                  <Form.Label>Ảnh</Form.Label>
                  <Image src={imagesrc} style={{ width: '90px', height: '160px', margin:'5%' }} />
                  <Typography style={{ fontSizemarginTop:'20px'}} onChange={handleChangeFile} variant="outlined" value={data.frontCover}>{photoFileName}</Typography>
                  </Col>
                  <input onChange={handleFileUpload} type="file" />
                </Col>
                </Row>
                <Row>
                  <Button onClick={handleSubmit} variant="contained" color="success" style={{marginTop: '20px'}}>
                    Lưu
                  </Button>
                </Row>
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
          <h1>Bạn không có quyền truy cập</h1>
        </div>
      </div>
    </div>
  );
}

