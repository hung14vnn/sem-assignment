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

export default function Products() {
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
    discount:'',
    price :'',
    description:'',
    quantity:'',
    language:'',
    categoryId:'',
    authorId:'',
    publisherId:'',
    frontCover:'',
    backCover:'',
    preview:'',
  }
]);
const handleChange = (event) => {
    setData({...data, [event.target.name]: event.target.value});

};
const handleSubmit = (event) => {
    event.preventDefault();
     fetch(`https://localhost:7191/Product/add-product`, {  
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: data.name,
            discount: data.discount,
            price: data.price,
            description: data.description,
            quantity: data.quantity,
            language: data.language,
            categoryId: data.categoryId,
            authorId: data.authorId,
            publisherId: data.publisherId,
            frontCover: photoFileName,
            backCover: backPhotoFileName,
            preview: preview
            
        }),

    })
    .then(response => 
      {
        if(response.ok){
            alert("Thêm thành công");
            window.location.href = "/admin/products";
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
const [dataAuthor, setDataAuthor] = useState();
useEffect(() => {
  fetch('https://localhost:7191/Author/get-raw-authors')
    .then((response) => response.json())
    .then((json) => setDataAuthor(json));
}, []);

const [dataCategory, setDataCategory] = useState();
useEffect(() => {
  fetch('https://localhost:7191/Category/get-raw-category')
    .then((response) => response.json())
    .then((json) => setDataCategory(json));
}, []);

const [dataPublisher, setDataPublisher] = useState();
useEffect(() => {
  fetch('https://localhost:7191/Publisher/get-raw-publishers')
    .then((response) => response.json())
    .then((json) => setDataPublisher(json));
}, []);


const [photoFileName, setPhotoFileName] = useState();
const [backPhotoFileName, setBackPhotoFileName] = useState();
const [preview, setPreview] = useState();
const imagesrc = 'https://localhost:7191/Photos/'+photoFileName
const backimagesrc = 'https://localhost:7191/Photos/'+backPhotoFileName
const previewsrc = 'https://localhost:7191/Photos/'+preview
const handleChangeFile = (event) => {
    setPhotoFileName(event.target.files[0].name);
}
const handleChangeBackFile = (event) => {
    setBackPhotoFileName(event.target.files[0].name);
}
const handleChangePreview = (event) => {
    setPreview(event.target.files[0].name);
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
};
const handleFileUpload1 = (event) => {
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
          setBackPhotoFileName(response);
      }
      else{
          alert("Something went wrong");
      }
  })
};
const handleFileUpload2 = (event) => {
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
          setPreview(response);
      }
      else{
          alert("Something went wrong");
      }
  })
};

    

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
                    <Form.Label>Giá</Form.Label>
                    <Form.Control onChange={handleChange} type="text" name="price" placeholder="Price" value={data.price} />
                </Col>      
                </Row>
                <Row>
                <Col>
                    <Form.Label>Giảm giá</Form.Label>
                    <Form.Control onChange={handleChange} type="text" name="discount" placeholder="Discount" value={data.discount} />
                </Col>
                <Col>
                    <Form.Label>Số Lượng</Form.Label>
                    <Form.Control onChange={handleChange} type="text" name="quantity" placeholder="Quantity" value={data.quantity}/>
                </Col>
                <Col>
                    <Form.Label>Ngôn Ngữ</Form.Label>
                    <Form.Control onChange={handleChange} type="text" name="language" placeholder="Language" value={data.language} />
                </Col>
                </Row>
                <Row>
                {/* show the textfield below in maxWidth */}
                <Col>
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control onChange={handleChange} as="textarea" rows="3" name="description" placeholder="Description" value={data.description} />
                </Col>
                </Row>
                <Row style={{marginTop:"20px"}}>
                <Col>
                    <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                   Thể Loại
                  </InputLabel>
                    <NativeSelect
                    onChange={handleChange}
                    inputProps={{
                    name: 'categoryId',
                    id: 'uncontrolled-native',
             }}
              >
               <option value="">
          </option>   
            {dataCategory && dataCategory.map(c => (
                <option value={c.categoryId}>
                       <div>
                            {c.name}
                       </div>
                    </option>
            ))}
                </NativeSelect>
              </FormControl>
                              </Col>
                              <Col>
                              <FormControl fullWidth>
                                  <InputLabel variant="standard" htmlFor="uncontrolled-native">Tác Giả</InputLabel>
                                  <NativeSelect
                                  onChange={handleChange}
                                  inputProps={{
                                  name: 'authorId',
                                  id: 'uncontrolled-native',
                          }}
                            >
                               <option value="">
                           </option>  
                                
                          {dataAuthor && dataAuthor.map(c => (
                              <option value={c.authorId}>
                                    <div>
                                          {c.name}
                                    </div>
                                  </option>
                          ))}
                </NativeSelect>
              </FormControl>
                              </Col>
                              <Col>
                              <FormControl fullWidth>
                                  <InputLabel variant="standard" htmlFor="uncontrolled-native">NXB</InputLabel>
                                  <NativeSelect
                                  onChange={handleChange}
                                  inputProps={{
                                  name: 'publisherId',
                                  id: 'uncontrolled-native',
                          }}
                            >
                               <option value="">
                           </option>  
                                
                          {dataPublisher && dataPublisher.map(c => (
                              <option value={c.publisherId}>
                                    <div>
                                          {c.name}
                                    </div>
                                  </option>
                          ))}
                </NativeSelect>
              </FormControl>
                </Col>
                </Row>
    
                <Row>
               
              <Col>
                  <Col>
                  <Form.Label>Bìa Trước</Form.Label>
                  <Image src={imagesrc} style={{ width: '90px', height: '160px', margin:'20px' }} />
                  <Typography style={{ fontSizemarginTop:'20px'}} onChange={handleChangeFile} variant="outlined" value={data.frontCover}>{photoFileName}</Typography>
                  </Col>
                  <input onChange={handleFileUpload} type="file" />
                </Col>
                <Col>
                  <Col>
                  <Form.Label>Bìa Sau</Form.Label>
                  <Image src={backimagesrc} style={{ width: '90px', height: '160px', margin:'20px'  }} />
                  <Typography style={{ fontSizemarginTop:'20px'}}onChange={handleChangeBackFile} variant="outlined" value={data.backCover}>{backPhotoFileName}</Typography>
                  </Col>
                  <input onChange={handleFileUpload1} type="file" />
                </Col>
                <Col>
                  <Col>
                  <Form.Label>Xem trước</Form.Label>
                  <Image src={previewsrc} style={{ width: '90px', height: '160px', margin:'20px'  }} />
                  <Typography style={{ fontSizemarginTop:'20px'}}onChange={handleChangePreview} variant="outlined" value={data.preview}>{preview}</Typography>
                  </Col>
                  <input onChange={handleFileUpload2} type="file" />
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

