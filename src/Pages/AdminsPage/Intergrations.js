import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import {Link} from "react-router-dom";
import TableRow from '@mui/material/TableRow';
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
import axios from "axios";
import { Pagination} from 'react-bootstrap';
import Button from '@mui/material/Button';


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

export default function IntergrationsPage() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [dataAuthor, setDataAuthor] = useState({
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

const [sortByAuthor, setSortByAuthor] = useState({
    sortStaffcode: false,
    sortLastName: false,
    sortUserName: false,
    sortJoinedDate: false,
    sortType: false,
});
const [sortASCAuthor, setSortASCAuthor] = useState(null);
const [searchValueAuthor, setSearchValueAuthor] = useState("");
const [pageNumberAuthor, setPageNumberAuthor] = useState(1);
const [pageSizeAuthor, setPageSizeAuthor] = useState(5);
const searchParamsAuthor = new URLSearchParams();

useEffect(() => {
    if (sortByAuthor.sortStaffcode) {
        searchParamsAuthor.append("SortBy", "StaffCode");
    }
    if (sortByAuthor.sortLastName) {
        searchParamsAuthor.append("SortBy", "LastName");
    }
    if (sortByAuthor.sortUserName) {
        searchParamsAuthor.append("SortBy", "UserName");
    }
    if (sortByAuthor.sortJoinedDate) {
        searchParamsAuthor.append("SortBy", "JoinedDate");
    }
    if (sortByAuthor.sortType) {
        searchParamsAuthor.append("SortBy", "Type");
    }


    if (searchValueAuthor.trim().length > 0) {
        searchParamsAuthor.append("SearchBy", "LastName");
        searchParamsAuthor.append("SearchValue", searchValueAuthor);
    }
    searchParamsAuthor.append("PageNumber", pageNumberAuthor);
    searchParamsAuthor.append("PageSize", pageSizeAuthor);
    searchParamsAuthor.toString();
    

    axios({
        method: "GET",
        url: `https://localhost:7191/Author/get-authors?${searchParamsAuthor}`,
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => {
            setDataAuthor({
                ...dataAuthor,
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
}, [sortByAuthor,  sortASCAuthor, searchValueAuthor, pageNumberAuthor, pageSizeAuthor]);



const handleChangePageNumberAuthor = (number) => {
    setPageNumberAuthor(number);
}


const handleDeleteAuthor = (authorId) => {
  fetch(`https://localhost:7191/Author/delete-author?authorId=${authorId}`, {
      method: 'DELETE',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
  })
    .then(res => {
        if (res.status === 200) {
           alert('Đã xóa thành công');
           window.location.reload();
        }
        else {
            alert('Tác giả này vẫn còn sách, không thể xóa');
        }
    })
  }




  const [dataPublisher, setDataPublisher] = useState({
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

const [sortByPublisher, setSortByPublisher] = useState({
    sortStaffcode: false,
    sortLastName: false,
    sortUserName: false,
    sortJoinedDate: false,
    sortType: false,
});
const [sortASCPublisher, setSortASCPublisher] = useState(null);
const [searchValuePublisher, setSearchValuePublisher] = useState("");
const [pageNumberPublisher, setPageNumberPublisher] = useState(1);
const [pageSizePublisher, setPageSizePublisher] = useState(5);
const searchParamsPublisher = new URLSearchParams();

useEffect(() => {
    if (sortByPublisher.sortStaffcode) {
        searchParamsPublisher.append("SortBy", "StaffCode");
    }
    if (sortByPublisher.sortLastName) {
        searchParamsPublisher.append("SortBy", "LastName");
    }
    if (sortByPublisher.sortUserName) {
        searchParamsPublisher.append("SortBy", "UserName");
    }
    if (sortByPublisher.sortJoinedDate) {
        searchParamsPublisher.append("SortBy", "JoinedDate");
    }
    if (sortByPublisher.sortType) {
        searchParamsPublisher.append("SortBy", "Type");
    }


    if (searchValuePublisher.trim().length > 0) {
        searchParamsPublisher.append("SearchBy", "LastName");
        searchParamsPublisher.append("SearchValue", searchValuePublisher);
    }
    searchParamsPublisher.append("PageNumber", pageNumberPublisher);
    searchParamsPublisher.append("PageSize", pageSizePublisher);
    searchParamsPublisher.toString();
    

    axios({
        method: "GET",
        url: `https://localhost:7191/Publisher/get-publishers?${searchParamsPublisher}`,
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => {
            setDataPublisher({
                ...dataPublisher,
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
}, [sortByPublisher,  sortASCPublisher, searchValuePublisher, pageNumberPublisher, pageSizePublisher]);



const handleChangePageNumberPublisher = (number) => {
    setPageNumberPublisher(number);
}


const handleDeletePublisher = (publisherId) => {
  fetch(`https://localhost:7191/Publisher/delete-publisher?publisherId=${publisherId}`, {
      method: 'DELETE',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
  })
    .then(res => {
        if (res.status === 200) {
           alert('Đã xóa thành công');
           window.location.reload();
        }
        else {
            alert('NXB này vẫn còn sách, không thể xóa');
        }
    })
  }



  const [dataCategory, setDataCategory] = useState({
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

const [sortByCategory, setSortByCategory] = useState({
    sortStaffcode: false,
    sortLastName: false,
    sortUserName: false,
    sortJoinedDate: false,
    sortType: false,
});
const [sortASCCategory, setSortASCCategory] = useState(null);
const [searchValueCategory, setSearchValueCategory] = useState("");
const [pageNumberCategory, setPageNumberCategory] = useState(1);
const [pageSizeCategory, setPageSizeCategory] = useState(5);
const searchParamsCategory = new URLSearchParams();

useEffect(() => {
    if (sortByCategory.sortStaffcode) {
        searchParamsCategory.append("SortBy", "StaffCode");
    }
    if (sortByCategory.sortLastName) {
        searchParamsCategory.append("SortBy", "LastName");
    }
    if (sortByCategory.sortUserName) {
        searchParamsCategory.append("SortBy", "UserName");
    }
    if (sortByCategory.sortJoinedDate) {
        searchParamsCategory.append("SortBy", "JoinedDate");
    }
    if (sortByCategory.sortType) {
        searchParamsCategory.append("SortBy", "Type");
    }


    if (searchValueCategory.trim().length > 0) {
        searchParamsCategory.append("SearchBy", "LastName");
        searchParamsCategory.append("SearchValue", searchValueCategory);
    }
    searchParamsCategory.append("PageNumber", pageNumberCategory);
    searchParamsCategory.append("PageSize", pageSizeCategory);
    searchParamsCategory.toString();
    

    axios({
        method: "GET",
        url: `https://localhost:7191/Category/GetAllCategories?${searchParamsCategory}`,
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => {
            setDataCategory({
                ...dataCategory,
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
}, [sortByCategory,  sortASCCategory, searchValueCategory, pageNumberCategory, pageSizeCategory]);



const handleChangePageNumberCategory = (number) => {
    setPageNumberCategory(number);
}


const handleDeleteCategory = (categoryId) => {
  fetch(`https://localhost:7191/Category/delete-category?categoryId=${categoryId}`, {
      method: 'DELETE',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
  })
    .then(res => {
        if (res.status === 200) {
           alert('Đã xóa thành công');
           window.location.reload();
        }
        else {
            alert('Thể loại này vẫn còn sách, không thể xóa');
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
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <React.Fragment>
      <h3 style={{ marginLeft:"40%"}}>Quản lý tác giả</h3>
      <Box sx={{ mb: 2 }}>
                  <Button
                    color="primary"
                    href="/add-author"
                  >
                    Thêm Tác Giả
                  </Button>
                  </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Mã Tác Giả</TableCell>
            <TableCell>Tên Tác Giả</TableCell>
            <TableCell>Mô Tả</TableCell>
            <TableCell>Quốc Tịch</TableCell>
            <TableCell>Ảnh (Nếu Có)</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataAuthor.data.map((author) => (
            <TableRow key={author.authorId}>
              <TableCell>{author.authorId}</TableCell>
              <TableCell>{author.name}</TableCell>
              <TableCell>{author.description}</TableCell>
              <TableCell>{author.nationality}</TableCell>
              <TableCell>{author.image ? <img src={`https://localhost:7191/Photos/${author.image}`} alt="front" width="80px" height="100px"/> : <img src={'https://localhost:7191/Photos/notfound.png'} alt="front" width="80px" height="80px"/> }</TableCell>
              <TableCell><button className="btn btn-danger" onClick={() =>handleDeleteAuthor(author.authorId)}>Xoá</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="ms-auto mt-5">
                    <Pagination className="my-auto">
                        <Pagination.Item>Total page: {dataAuthor.totalPages} </Pagination.Item>
                        <Pagination.First onClick={() => handleChangePageNumberAuthor(dataAuthor.firstPage)}/>
                        <Pagination.Prev onClick={() => handleChangePageNumberAuthor(dataAuthor.previousPage)}/>
                        <Pagination.Item>{dataAuthor.pageNumber}</Pagination.Item>
                        <Pagination.Next onClick={() => handleChangePageNumberAuthor(dataAuthor.nextPage)}/>
                        <Pagination.Last onClick={() => handleChangePageNumberAuthor(dataAuthor.lastPage)}/>
                    </Pagination>
                </div>
    </React.Fragment>
                </Paper>


                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <React.Fragment>
      <h3 style={{ marginLeft:"40%"}}>Quản lý NXB</h3>
      <Box sx={{ mb: 2 }}>
                  <Button
                    color="primary"
                    href="/add-publisher"
                  >
                    Thêm NXB
                  </Button>
                  </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Mã NXB</TableCell>
            <TableCell>Tên NXB</TableCell>
            <TableCell>Mô Tả</TableCell>
            <TableCell>Quốc Gia</TableCell>
            <TableCell>Ảnh (Nếu Có)</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataPublisher.data.map((publisher) => (
            <TableRow key={publisher.publisherId}>
              <TableCell>{publisher.publisherId}</TableCell>
              <TableCell>{publisher.name}</TableCell>
              <TableCell>{publisher.description}</TableCell>
              <TableCell>{publisher.nationality}</TableCell>
              <TableCell>{publisher.image ? <img src={`https://localhost:7191/Photos/${publisher.image}`} alt="front" width="80px" height="100px"/> : <img src={'https://localhost:7191/Photos/notfound.png'} alt="front" width="80px" height="80px"/> }</TableCell>
              <TableCell><button className="btn btn-danger" onClick={() =>handleDeletePublisher(publisher.publisherId)}>Xoá</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="ms-auto mt-5">
                    <Pagination className="my-auto">
                        <Pagination.Item>Total page: {dataPublisher.totalPages} </Pagination.Item>
                        <Pagination.First onClick={() => handleChangePageNumberPublisher(dataPublisher.firstPage)}/>
                        <Pagination.Prev onClick={() => handleChangePageNumberPublisher(dataPublisher.previousPage)}/>
                        <Pagination.Item>{dataPublisher.pageNumber}</Pagination.Item>
                        <Pagination.Next onClick={() => handleChangePageNumberPublisher(dataPublisher.nextPage)}/>
                        <Pagination.Last onClick={() => handleChangePageNumberPublisher(dataPublisher.lastPage)}/>
                    </Pagination>
                </div>
    </React.Fragment>
                </Paper>


                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <React.Fragment>
      <h3 style={{ marginLeft:"40%"}}>Quản lý thể loại sản phẩm</h3>
      <Box sx={{ mb: 2 }}>
                  <Button
                    color="primary"
                    href="/add-category"
                  >
                    Thêm Thể Loại
                  </Button>
                  </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Mã Thể Loại</TableCell>
            <TableCell>Tên Thể Loại</TableCell>
            <TableCell>Mô Tả</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataCategory.data.map((category) => (
            <TableRow key={category.categoryId}>
              <TableCell>{category.categoryId}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell><button className="btn btn-danger" onClick={() =>handleDeleteCategory(category.categoryId)}>Xoá</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="ms-auto mt-5">
                    <Pagination className="my-auto">
                        <Pagination.Item>Total page: {dataCategory.totalPages} </Pagination.Item>
                        <Pagination.First onClick={() => handleChangePageNumberCategory(dataCategory.firstPage)}/>
                        <Pagination.Prev onClick={() => handleChangePageNumberCategory(dataCategory.previousPage)}/>
                        <Pagination.Item>{dataCategory.pageNumber}</Pagination.Item>
                        <Pagination.Next onClick={() => handleChangePageNumberCategory(dataCategory.nextPage)}/>
                        <Pagination.Last onClick={() => handleChangePageNumberCategory(dataCategory.lastPage)}/>
                    </Pagination>
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
          <h1>Bạn không có quyền truy cập</h1>
        </div>
      </div>
    </div>
  );
}

