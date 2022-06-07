import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Pagination} from 'react-bootstrap';
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
import ViewProductModal from './Modals/ViewProductModal';
import axios from "axios";


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
  const [data, setData] = useState({
      data: [],
      errors: null,
      succeeded: null,
      message: null,
      firstPage: null,
      lastPage: null,
      nextPage: null,
      previousPage: null,
      pageNumber: 1,
      pageSize: 8,
      totalPages: 1,
      totalRecords: null,
      searchBy: "",
      searchValue: "",
      sortBy: "",
      sortType: ""
  });

  const [sortBy, setSortBy] = useState({
      sortStaffcode: false,
      sortLastName: false,
      sortUserName: false,
      sortJoinedDate: false,
      sortType: false,
  });
  const [sortASC, setSortASC] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const searchParams = new URLSearchParams();

  useEffect(() => {
      if (sortBy.sortStaffcode) {
          searchParams.append("SortBy", "StaffCode");
      }
      if (sortBy.sortLastName) {
          searchParams.append("SortBy", "LastName");
      }
      if (sortBy.sortUserName) {
          searchParams.append("SortBy", "UserName");
      }
      if (sortBy.sortJoinedDate) {
          searchParams.append("SortBy", "JoinedDate");
      }
      if (sortBy.sortType) {
          searchParams.append("SortBy", "Type");
      }


      if (searchValue.trim().length > 0) {
          searchParams.append("SearchBy", "LastName");
          searchParams.append("SearchValue", searchValue);
      }
      searchParams.append("PageNumber", pageNumber);
      searchParams.append("PageSize", pageSize);
      searchParams.toString();
      

      axios({
          method: "GET",
          url: `https://localhost:7191/Product/GetAllProducts?${searchParams}`,
          headers: {
              'Content-Type': 'application/json',
          }
      })
          .then(res => {
              setData({
                  ...data,
                  data: res.data.data,
                  errors: res.data.errors,
                  succeeded: res.data.succeeded,
                  message: res.data.message,
                  firstPage: res.data.firstPage,
                  lastPage: res.data.lastPage,
                  nextPage: res.data.nextPage,
                  previousPage: res.data.previousPage,
                  pageNumber: res.data.pageNumber,
                  pageSize: res.data.pageSize,
                  totalPages: res.data.totalPages,
                  totalRecords: res.data.totalRecords,
                  searchBy: res.data.searchBy,
                  searchValue: res.data.searchValue,
                  sortBy: res.data.sortBy,
                  sortType: res.data.sortType
              });
          });
  }, [sortBy,  sortASC, searchValue, pageNumber, pageSize]);



  const handleChangePageNumber = (number) => {
      setPageNumber(number);
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
const [product, setProduct] = useState({});
const [viewShow, setViewShow] = useState(false);
const handleViewClose = () => setViewShow(false);
const handleViewShow = (product) => {
        setProduct(product);
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
              Quản Lý
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
                  <Box sx={{ mb: 2 }}>
                  <Button
                    color="primary"
                    href="/add-product"
                  >
                    Thêm Sản Phẩm
                  </Button>
                  </Box>
                  <Root>
                 <table className="mt-4" hover size="md"> 
                    <thead>
                        <tr>
                        <th>Tên Sản Phẩm</th>
                        <th>Tác Giả</th>
                        <th>T/L</th>
                        <th>NXB</th>
                        <th>Bìa Trước</th>
                        <th>Bìa Sau</th>
                        <th>Giá</th>
                        <th>Giảm(%)</th>
                        <th>SL</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.map((product, index) => (
                            <tr key={index+1}>  
                                <td>{product.name}</td>
                                <td>{dataAuthor && dataAuthor.find(author => author.authorId === product.authorId).name}</td>
                                <td>{dataCategory && dataCategory.find(category => category.categoryId === product.categoryId).name}</td>
                                <td>{dataPublisher && dataPublisher.find(publisher => publisher.publisherId === product.publisherId).name}</td>
                                <td><img src={'https://localhost:7191/Photos/'+product.frontCover} alt="front" width="80px" height="145px"/></td>
                                <td><img src={'https://localhost:7191/Photos/'+product.backCover} alt="back" width="80px" height="145px"/></td>
                                <td>{product.price}</td>
                                <td>{product.discount}</td>
                                <td>{product.quantity}</td>
                            <td>
                                <Button variant="outlined" size='small' color="success" onClick={() => handleViewShow(product)}>Xem
                                </Button>
                      
                                </td>
                            </tr>
                        ))} 
                 </tbody>
                </table>
                </Root>
                <div className="ms-auto mt-5">
                    <Pagination className="my-auto">
                        <Pagination.Item>Total page: {data.totalPages} </Pagination.Item>
                        <Pagination.First onClick={() => handleChangePageNumber(data.firstPage)}/>
                        <Pagination.Prev onClick={() => handleChangePageNumber(data.previousPage)}/>
                        <Pagination.Item>{data.pageNumber}</Pagination.Item>
                        <Pagination.Next onClick={() => handleChangePageNumber(data.nextPage)}/>
                        <Pagination.Last onClick={() => handleChangePageNumber(data.lastPage)}/>
                    </Pagination>
                </div>
                <ViewProductModal show={viewShow} onHide={handleViewClose} product={product}/>
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

